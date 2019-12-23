import Bcrypt from "bcrypt";
import User from "../../../db/models/user_exported";

export async function doLogin(msg) {
    const {username, password} = msg;

    if (!username || !password) {
        this.emit('login response', {success: false, msg: "Vui lòng không bỏ trống tài khoản / mật khẩu."});
        return;
    }

    const user = await User.findOne({where: {username: username}});
    if (!user) {
        this.emit('login response', {success: false, msg: "Tài khoản không tồn tại."});
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
        this.emit('login response', {success: false, msg: "Sai mật khẩu."});
        return;
    }

    this.user = user;
    this.emit('login response', {success: true});
}

export async function doRegister(msg) {
    register.screen
}
