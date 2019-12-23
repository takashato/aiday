import Bcrypt from "bcrypt";
import User from "../../../db/models/user_exported";

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

    this.user = user;
    this.emit('login response', {
       user: {
           id: user.id,
           username: user.username,
           email: user.email,
           birthday: user.birthday,
           display_name: user.display_name,
           is_admin: user.is_admin,
           created_at: user.created_at,
           updated_at: user.updated_at,
       }
    });
}

export async function doRegister(msg) {
    register.screen
}
