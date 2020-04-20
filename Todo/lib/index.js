import "bootstrap";

var todo_id = 0;

// TODOを追加する。
function addTodo() {

    // 入力したTODOを取得する。
    const todoContent = document.getElementById("todo-input-content").value;
    todo_id++;

    // 入力したTODOを元に行要素を作成して追加する。
    const tbodyTodoList = document.getElementById("todo-list-tbody");
    const tr = document.createElement("tr");
    tr.setAttribute("id", todo_id);
    tbodyTodoList.appendChild(tr);
    const th = document.createElement("th");
    th.setAttribute("class", "align-middle");
    th.textContent = todo_id;
    tr.appendChild(th);
    const tdContent = document.createElement("td");
    tdContent.setAttribute("class", "align-middle");
    tdContent.textContent = todoContent;
    tr.appendChild(tdContent);
    const tdButtons = document.createElement("td");
    tr.appendChild(tdButtons);
    const buttonFix = document.createElement("button");
    buttonFix.setAttribute("type", "button");
    buttonFix.setAttribute("class", "todo-list-button-fix");
    buttonFix.textContent = "編集";
    tdButtons.appendChild(buttonFix);
    const buttonSave = document.createElement("button");
    buttonSave.setAttribute("type", "button");
    buttonSave.setAttribute("class", "todo-list-button-save-hidden");
    buttonSave.textContent = "保存";
    tdButtons.appendChild(buttonSave);
    const buttonCancel = document.createElement("button");
    buttonCancel.setAttribute("type", "button");
    buttonCancel.setAttribute("class", "todo-list-button-cancel-hidden");
    buttonCancel.textContent = "キャンセル";
    tdButtons.appendChild(buttonCancel);
    const buttonDelete = document.createElement("button");
    buttonDelete.setAttribute("type", "button");
    buttonDelete.setAttribute("class", "todo-list-button-delete");
    buttonDelete.setAttribute("data-toggle", "modal")
    buttonDelete.setAttribute("data-target", "#delete-modal")
    buttonDelete.textContent = "削除";
    buttonDelete.addEventListener('click', () => {
        const deleteCheckButton = document.getElementById("delete-check-button");
        if (deleteCheckButton) {
            deleteCheckButton.setAttribute("data-todo-id", todo_id);
        }
    });
    tdButtons.appendChild(buttonDelete);

}

// TODOを削除する。
function deleteTodo(id) {
    const trTodo = document.getElementById(id);
    if (trTodo) {
        const parentNode = trTodo.parentNode;
        if (parentNode) {
            parentNode.removeChild(trTodo);
        }
    }
}

window.addEventListener("load", () => {

    // TODO追加ボタンのクリック時の処理を定義する。
    document.getElementById("todo-button-add").addEventListener("click", () => {
        addTodo();
    });

    // TODO削除モーダルの削除ボタンのクリック処理を定義する。
    document.getElementById("delete-check-button").addEventListener("click", (event) => {
        const deleteCheckButton = event.target;
        const todoID = deleteCheckButton.getAttribute("data-todo-id");
        deleteTodo(todoID);
    })

});
