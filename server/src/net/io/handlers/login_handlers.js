export async function doLogin(msg) {
    this.emit('login response', {msg: 'Login??', ...msg});
}