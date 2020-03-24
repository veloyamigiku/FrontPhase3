'use strict';

import GithubClient from './GithubClient';

function updateSearchTable(tableBodyId, userSearchObj) {
    clearSearchTableBody(tableBodyId);
    addSearchUser(tableBodyId, userSearchObj);
}

function addSearchUser(tableBodyId, userSearchObj) {
    // 検索した各ユーザの情報を、tr-tdタグで出力する。
    const tableBody = document.getElementById(tableBodyId);
    const items = userSearchObj.items;
    items.forEach((item, index) => {
        const login = item.login;
        const htmlUrl = item.html_url;
        const tr = document.createElement('tr');
        tableBody.appendChild(tr);
        const idxTd = document.createElement('td');
        idxTd.textContent = parseInt(index + 1);
        tr.appendChild(idxTd);
        const userTd = document.createElement('td');
        const userA = document.createElement('a');
        userA.setAttribute('href', htmlUrl);
        userA.setAttribute('target', '_blank');
        userA.textContent = login;
        userTd.appendChild(userA);
        tr.appendChild(userTd);
    });
}

function clearSearchTableBody(tableBodyId) {
    // tbodyタグを削除して、再作成する。
    const tableBody = document.getElementById(tableBodyId);
    const tableBodyParent = tableBody.parentElement;
    tableBodyParent.removeChild(tableBody);
    const newTableBody = document.createElement('tbody');
    newTableBody.setAttribute('id', tableBodyId);
    tableBodyParent.appendChild(newTableBody);
}

function userSearch(query) {
    const searchMessage = document.getElementById('search-message');
    searchMessage.setAttribute('display', 'none');
    if (query === '') {
        searchMessage.textContent = 'ユーザ名を入力してください。';
        searchMessage.setAttribute('display', 'inherit');
        return;
    }
    GithubClient.userSearch(
        query,
        res => {
            const userSearchObj = JSON.parse(res);
            updateSearchTable(
                'search-user-table-body',
                userSearchObj);
            console.log(userSearchObj);
        },
        e => {
            console.log(e);
        }
    );
}

window.addEventListener('load', () => {
    document.getElementById('search-button').addEventListener('click', () => {
        const query = document.getElementById('query').value;
        userSearch(query);
    });
});
