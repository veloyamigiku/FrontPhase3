'use strict';

export default class Utils {
    static fromHashToQuery(hash) {
        return '?' + Object.keys(hash).map((key) => {
            return key + '=' + hash[key];
        }).join('&');
    }
}
