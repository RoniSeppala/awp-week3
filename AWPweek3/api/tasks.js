const express = require("express");
const router = express.Router();
const fs = require("fs");

todos = [];

router.post("/",(req,res) =>{

    const data = req.body;
    let savedEntry = false;
    let todoExists = false;

    todos.forEach(element => {
        if (element.name == data.name){

            element.todos.forEach(element2 => {
                if (element2 == data.todo){
                    todoExists = true;
                }
            });

            if (!todoExists){
                element.todos.push(data.todo)
            }

            savedEntry = true;
        };
    });

    if (!savedEntry) {
        todos.push({name: data.name, todos: [data.todo]})
    }

    console.log(todos)

    if (!savedEntry){
        res.send("User added")
    } else {
        res.send("Todo added")
    }
});

module.exports = router;