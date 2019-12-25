import Hapi from '@hapi/hapi';
import SocketIO from 'socket.io';

import serverConfig from './config/server';
import applyHandlers from "./net/io/handlers/handlers";

import {init as initDb} from "./db/db";

const server = Hapi.server(serverConfig.hapi);

export const io = SocketIO.listen(server.listener);

io.sockets.on('connection', function (socket) {
    var address = socket.request.connection.remoteAddress;
    console.log(address + ' connected (SocketID ' + socket.id + ").");

    applyHandlers(socket);
});

async function init() {
    if (!await initDb()) process.exit();
    await server.start();
    console.log('>>> Server is listening on ' + server.info.uri);
}

export default init;
