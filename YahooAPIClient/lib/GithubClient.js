'use strict';

import Client from './Client';
import Utils from './Utils';

export default class GithubClient {
    static userSearch(q, page, perPage, resolve, reject) {
        const queryString = Utils.fromHashToQuery({
            q: q,
            per_page: perPage,
            page: page
        });
        const url = 'https://api.github.com/search/users' + queryString;
        return Client.get(url).then(resolve).catch(reject);
    }
}
