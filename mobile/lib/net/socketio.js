import io from 'socket.io-client';
import config from '../config';

let socket = null;

export function init() {
    return new Promise((resolve, reject) => {
        if (socket) {
            return resolve(true);
        }
        socket = io(config.webUrl, config.options);

        socket.on('connect', function () {
            console.log('Connected to server.');
            resolve(true);
        });

        socket.on('connect_error', function (err) {
            reject(err);
        });

        socket.on('error', (err) => {
            reject(err);
        });
    });
}

function getSocket() {
    return socket;
}

export default getSocket;
