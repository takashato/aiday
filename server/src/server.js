import Hapi from '@hapi/hapi';
import SocketIO from 'socket.io';

import serverConfig from './config/server';

const server = Hapi.server(serverConfig.hapi);

const io = SocketIO.listen(server.listener);

io.sockets.on('connection', function (socket) {
    var address = socket.request.connection.remoteAddress;
    console.log(address + ' connected (SocketID ' + socket.id + ").")
});

async function init() {
    await server.start();
    console.log('Server is listening on ' + server.info.uri);
}

export default init;