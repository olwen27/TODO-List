class todo {
    constructor() {
        this.array = [];
        this.browser = JSON.parse(localStorage.getItem("array"));
        this.date = new Date();
    }

    getTodos() {
        if (this.browser != null) {
            this.array = this.browser;
        }
        return this.array;
    }

    add() {
        let todo = document.querySelector('#todo').value;
        let dateToComplete = document.querySelector('#dateToComplete').value;

        let index = this.getTodos().length;

        this.array.push({
            index: this.getTodos().length,
            value: todo,
            dateToComplete: dateToComplete,
            creationDate: this.getDate(),
            completedDate: ""
        });

        this.displayToDos();
        cleanAndFocusTodo();
        validateTodoInput();
    }

    update() {

        var value = document.querySelector('#todo').value;
        var id = document.querySelector('#id').value;
        var copyArray = [];

        this.getTodos().forEach(x => {
            if (x.index == id) {
                x.value = value;
            }
            copyArray.push(x);
        })

        this.array = copyArray;
        document.querySelector('#add').style.display = "block";
        document.querySelector('#edit').style.display = "none";
        cleanAndFocusTodo();
        todoClass.displayToDos();
    }

    deleteTodo(index) {

        let copyArray = [];
        this.array.splice(index, 1)

        this.getTodos().forEach(x => {
            copyArray.push(x);
        })

        this.displayToDos();
    }

    complete(id) {

        var copyArray = [];

        this.getTodos().forEach(x => {
            if (x.index == id) {
                x.completedDate = todoClass.getDate();
            }
            copyArray.push(x);
        })

        this.array = copyArray;
        document.querySelector('#add').style.display = "block";
        document.querySelector('#edit').style.display = "none";
        cleanAndFocusTodo();
        todoClass.displayToDos();
    }

    displayToDos() {
        let count = 0;
        let textDecoration = "";
        tbody.innerHTML = "";

        if (this.getTodos().length != 0) {
            document.querySelector('#message').style.display = "none";
            document.querySelector('#table').style.display = "inline";
            document.querySelector("#filter").disabled = false;
        } else {
            document.querySelector('#table').style.display = "none";
        }

        this.getTodos().forEach(x => {

            if (x.completedDate.length > 2) {
                textDecoration = "line-through";
            } else {
                textDecoration = "";
            }
            tbody.innerHTML += `
            <tr value="${x.value}, ${x.dateToComplete}" style="text-decoration: ${textDecoration};">
                <td class="text-white">${count}</td>
                <td class="text-white">${x.value}</td>
                <td class="text-white">${x.dateToComplete}</td>
                <td class="text-white">${x.completedDate}</td>
                <td class="text-white">${x.creationDate}</td>
                <td class="text-white">

                    <a onclick="editTodo(${x.index})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg>
                    </a>

                    <a onclick="todoClass.complete(${x.index})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                        </svg>
                    </a>

                    <a onclick="todoClass.deleteTodo(${count})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6.5 1a.5.5 0 0 0-.5.5v1h4v-1a.5.5 0 0 0-.5-.5h-3ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1H3.042l.846 10.58a1 1 0 0 0 .997.92h6.23a1 1 0 0 0 .997-.92l.846-10.58Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                        </svg>
                    </a>
                </td>
            </tr>
            `;

            count++;
        })
    }

    filter(todos, inputId) {

        todos.forEach(x => {

            if (x.textContent.toLowerCase().includes(document.querySelector(`#${inputId}`).value.toLowerCase())) {
                document.querySelector('#table').style.display = "inline";
                x.style.display = "line";
            } else {
                document.querySelector('#table').style.display = "inline";

                x.style.display = "none";
            }
        })

        if (filter.value.length === 0) {
            todoClass.displayToDos();
        }

    }

    save = () => localStorage.setItem('array', JSON.stringify(this.array));

    getDate() {
        console.log(`${this.date.getDay()}/${this.date.getMonth()}/${this.date.getFullYear()}`);
        return `${this.date.getDay()}/${this.date.getMonth()}/${this.date.getFullYear()}`;
    }
}