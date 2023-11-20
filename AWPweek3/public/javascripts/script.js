
const sumbitButton = document.getElementById("submit-data");
const inputName = document.getElementById("input-name");
const inputTask = document.getElementById("input-task");
const textOutput = document.getElementById("output");

sumbitButton.addEventListener('click', () => {
    const name = inputName.value;
    const task = inputTask.value;

    fetch("http://localhost:3000/api/tasks/", {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body:JSON.stringify( {name, todo: task} )
    }).then(response => response.text())
    .then(data => {
        console.log(data);
        textOutput.innerText = data;
    })
})