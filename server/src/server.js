import Hapi from '@hapi/hapi';
import SocketIO from 'socket.io';

import serverConfig from './config/server';

const server = Hapi.server(serverConfig.hapi);
const ioServer = Hapi.server(serverConfig.io);

const io = SocketIO(ioServer.listener);

async function init() {
    await server.start();
    console.log('Hapi is listening on ' + server.info.uri);
    await ioServer.start();
    console.log('SocketIO is listening on port ' + ioServer.info.port);
}

export default init;