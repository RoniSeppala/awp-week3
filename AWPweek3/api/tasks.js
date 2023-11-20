const express = require("express");
const router = express.Router();
const fs = require("fs");

todos = [];

fs.readFile("./AWPweek3/data/tasks.json", "utf-8" , (error, data) => {
    if (error){
        console.log(error);
        return;
    }
    if (data){
        todos = JSON.parse(data)
        console.log("Data Loaded")
    }
})

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

    if (!savedEntry){
        res.send("User added")
    } else {
        res.send("Todo added")
    }

    console.log(todos)

    fs.writeFile("./AWPweek3/data/tasks.json", JSON.stringify(todos), error => {
        if (error){
            console.log(error);
            return;
        }

        console.log("Data Saved")
    })
});

module.exports = router;