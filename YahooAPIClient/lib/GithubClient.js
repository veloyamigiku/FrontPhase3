'use strict';

import Client from './Client';

export default class GithubClient {
    static userSearch(query, resolve, reject) {
        const url = 'https://api.github.com/search/users?q=' + query;
        return Client.get(url).then(resolve).catch(reject);
    }
}
