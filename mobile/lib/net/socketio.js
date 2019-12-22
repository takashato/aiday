import io from 'socket.io-client';
import config from '../config';

let socket;

export function init() {
    socket = io(config.webUrl, config.options);

    socket.on('connect', function () {
        console.log('Connected to server.');
    });

    socket.on('connect_error', function (err) {
        console.error(err);
    });

    socket.on('error', (err) => {
        console.error(err);
    });

    return socket;
}

export default socket;
