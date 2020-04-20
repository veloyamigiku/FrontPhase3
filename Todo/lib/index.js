
var todo_id = 0;

window.addEventListener("load", () => {

    // TODO追加ボタンをクリックした時の処理を定義する。
    document.getElementById("todo-button-add").addEventListener("click", () => {
        
        // 入力したTODOを取得する。
        const todoContent = document.getElementById("todo-input-content").value;
        todo_id++;

        // 入力したTODOを元に行要素を作成して追加する。
        const tbodyTodoList = document.getElementById("todo-list-tbody");
        const tr = document.createElement("tr");
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
        buttonDelete.textContent = "削除";
        tdButtons.appendChild(buttonDelete);
        
    });

});
