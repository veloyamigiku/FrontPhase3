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

function updatePaging(page, perPage, userSearchObj) {
    const totalCount = parseInt(userSearchObj.total_count);

    // リンクの有効・無効を更新する。
    const searchPagingPrevLink = document.getElementById('search-item-paging-prev-link');
    const searchPagingNextLink = document.getElementById('search-item-paging-next-link');

    if (page === 1) {
        searchPagingPrevLink.classList.add('search-item-paging-link_disable');
    } else {
        searchPagingPrevLink.classList.remove('search-item-paging-link_disable');
    }

    if (totalCount < page * perPage) {
        searchPagingNextLink.classList.add('search-item-paging-link_disable');
    } else {
        searchPagingNextLink.classList.remove('search-item-paging-link_disable');
    }

    // リンクを独自属性を更新する。
    searchPagingPrevLink.setAttribute('data-page', page - 1);
    searchPagingPrevLink.setAttribute('data-per-page', perPage);
    searchPagingNextLink.setAttribute('data-page', page + 1);
    searchPagingNextLink.setAttribute('data-per-page', perPage);
}

function userSearch(query, page, perPage) {
    const searchMessage = document.getElementById('search-message');
    searchMessage.style.display = 'none';
    if (query === '') {
        searchMessage.textContent = 'ユーザ名を入力してください。';
        searchMessage.style.display = 'block';
        return;
    }
    GithubClient.userSearch(
        query,
        page,
        perPage,
        res => {
            const userSearchObj = JSON.parse(res);
            updatePaging(
                page,
                perPage,
                userSearchObj);
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
    document.getElementById('search-item-search-button').addEventListener('click', () => {
        const q = document.getElementById('search-item-q').value;
        const page = 1;
        const perPage = parseInt(document.getElementById('search-item-display-count').value);
        userSearch(q, page, perPage);
    });

    document.getElementById('search-item-paging-prev-link').addEventListener('click', () => {
        const q = document.getElementById('search-item-q').value;
        const page = parseInt(document.getElementById('search-item-paging-prev-link').getAttribute('data-page'));
        const perPage = parseInt(document.getElementById('search-item-paging-prev-link').getAttribute('data-per-page'));
        userSearch(q, page, perPage);
    });

    document.getElementById('search-item-paging-next-link').addEventListener('click', () => {
        const q = document.getElementById('search-item-q').value;
        const page = parseInt(document.getElementById('search-item-paging-next-link').getAttribute('data-page'));
        const perPage = parseInt(document.getElementById('search-item-paging-next-link').getAttribute('data-per-page'));
        userSearch(q, page, perPage);
    });
});
