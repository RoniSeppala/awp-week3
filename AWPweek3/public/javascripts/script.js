const sumbitButton = document.getElementById("submit-data");
const inputName = document.getElementById("input-name");
const inputTask = document.getElementById("input-task");
const textOutput = document.getElementById("output");

const searchButton = document.getElementById("search")
const searchField = document.getElementById("search-name")
const resutbox = document.getElementById("returnField")

sumbitButton.addEventListener('click', () => {
    const name = inputName.value;
    const task = inputTask.value;

    fetch("http://localhost:3000/todo", {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body:JSON.stringify( {name, todo: task} )
    }).then(response => response.text())
    .then(data => {
        textOutput.innerText = data;
    })
})

searchButton.addEventListener('click', () => {
    const searchName = searchField.value;

    fetch("http://localhost:3000/user/" + searchName).then(response => response.text())
    .then(data => {
        console.log(data)

        resutbox.innerHTML = ""
        parsedData = JSON.parse(data)

        if (data == "No user searched"){
            let responseElement = document.createElement("h3")
            responseElement.innerText = "No user searched"
            resutbox.appendChild(responseElement)
        } else if (data == "User not found"){
            let responseElement = document.createElement("h3")
            responseElement.innerText = "User not found"
            resutbox.appendChild(responseElement)
        } else if (parsedData.response == "Data found"){
            let responseElement = document.createElement("h3")
            responseElement.innerText = parsedData.data.name
            resutbox.appendChild(responseElement)

            let todoList = document.createElement("ul")
            parsedData.data.todos.forEach(element => {
                let todo = document.createElement("li")
                todo.innerText = element;
                todoList.appendChild(todo);
            });
            resutbox.appendChild(todoList)
        } else {
            let responseElement = document.createElement("h3")
            responseElement.innerText = "Error fetching data"
            resutbox.appendChild(responseElement)

        }
    })
})