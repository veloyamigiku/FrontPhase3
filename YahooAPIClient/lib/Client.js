'use strict';

export default class Client {
    static get(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(
                'GET',
                url,
                true);
            xhr.addEventListener('load', () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(new Error(xhr.statusText));
                }
            });
            xhr.addEventListener('error', () => {
                reject(new Error(xhr.statusText));
            });
            xhr.send(null);
        });
    }
}
