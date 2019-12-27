import axios from 'axios';
import config from '../config';

export async function uploadToImgur(image) {
    if (!image.path) return false;
    const fileName = image.path.split('/').pop();
    if (!image.data) return false;
    try {
        const res = await axios.post('https://api.imgur.com/3/upload', {
            image: image.data,
            type: 'base64',
            name: fileName,
            title: fileName,
            description: 'Image uploaded via Aiday chat app.',
        }, {
            headers: {
                'Authorization': `Client-ID ${config.imgur.clientId}`,
            }
        });
        if (!res.data.success) {
            return false;
        }
        return res.data.data;
    } catch (err) {
        console.log(err.data);
        return false;
    }
}
