import Bcrypt from "bcrypt";
import User from "../../../db/models/user_exported";
import moment from "moment";
import serverConfig from "../../../config/server";
import JWT from 'jsonwebtoken';

export async function doLogin(msg) {
    console.log('Login: ', msg);

    const {username, password} = msg;

    if (!username || !password) {
        this.emit('login response', {error: "Vui lòng không bỏ trống tài khoản / mật khẩu."});
        return;
    }

    const user = await User.findOne({where: {username: username}});
    if (!user) {
        this.emit('login response', {error: "Tài khoản không tồn tại.", errorField: 'username'});
        return;
    }
    if (user.password.length < 50) {
        user.password = Bcrypt.hashSync(user.password, Bcrypt.genSaltSync());
        try {
            await user.save();
        } catch (err) {
        }
    }
    if (!Bcrypt.compareSync(password, user.password)) {
        this.emit('login response', {error: "Sai mật khẩu.", errorField: 'password'});
        return;
    }

    this.emit('login response', {
        // user: {
        //     id: user.id,
        //     username: user.username,
        //     email: user.email,
        //     birthday: user.birthday,
        //     display_name: user.display_name,
        //     is_admin: user.is_admin,
        //     created_at: user.created_at,
        //     updated_at: user.updated_at,
        // },
        accessToken: JWT.sign({
            id: user.id,
            username: user.username
        }, serverConfig.jwtSecretKey, {expiresIn: '30d'}),
    });
}

export async function doRegister(msg) {
    console.log('register', msg);
    const {username, password, display_name, birthday} = msg;
    if (!/^([A-z0-9_]+)$/.test(username) || username.length < 5) {
        this.emit('register response', {
            error: 'Tên tài khoản chỉ gồm chữ hoa, chữ thường, số và dài ít nhất 5 ký tự.',
            errorField: 'username'
        });
        return;
    }
    if (!password || password === '' || password.length < 5) {
        this.emit('register response', {
            error: 'Vui lòng nhập mật khẩu ít nhất 5 ký tự.',
            errorField: 'password'
        });
        return;
    }
    if (!display_name || display_name === '') {
        this.emit('register response', {
            error: 'Vui lòng nhập tên hiển thị.',
            errorField: 'display_name'
        });
        return;
    }
    const birthdayObj = moment(birthday, ['DD/MM/YYYY']);
    if (!birthday || !birthdayObj.isValid()) {
        this.emit('register response', {
            error: 'Vui lòng chọn ngày sinh hợp lệ.',
            errorField: 'birthday'
        });
        return;
    }
    if ((await User.count({where: {username: username}})) > 0) {
        this.emit('register response', {
            error: 'Tên tài khoản đã tồn tại, vui lòng chọn tên khác.',
            errorField: 'username'
        });
        return;
    }
    const user = User.build({
        username,
        password: Bcrypt.hashSync(password, Bcrypt.genSaltSync()),
        email: 'user@aiday.com',
        birthday: birthdayObj.format('YYYY-MM-DD'),
        is_admin: 0,
        display_name: display_name,
        avatar: 'https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/brand-logo.a78e4b51.png',
    });
    try {
        if (!await user.save()) {
            this.emit('register response', {
                error: 'Gặp lỗi khi tạo tài khoản.',
                errorField: 'username'
            });
            return;
        }
        this.emit('register response', {
            accessToken: JWT.sign({
                id: user.id,
                username: user.username
            }, serverConfig.jwtSecretKey, {expiresIn: '30d'}),
        });
    } catch (err) {
        console.log(err);
        this.emit('register response', {
            error: 'Gặp lỗi khi tạo tài khoản.',
            errorField: 'username'
        });
    }
}
