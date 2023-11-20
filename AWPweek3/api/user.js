const { count } = require("console");
const express = require("express");
const router = express.Router();
const fs = require("fs");

const responseJSON = {
    "response": "",
    "data": ""
}

router.get("/", (req,res) => {
    responseJSON.response = "No user searched"
    responseJSON.data = ""
    res.send(responseJSON)
})

router.get("/:id", (req,res) => {

    fs.readFile("./AWPweek3/data/tasks.json", "utf-8" , (error, data) => {
        if (error){
            console.log(error);
            return;
        }

        let allTodos =  data ? JSON.parse(data): []

        let found = false;
        allTodos.forEach(element => {
            if (element.name == req.params.id) {
                responseJSON.response = "Data found";
                responseJSON.data = element;
                res.send(responseJSON);
                found = true;
            }
        });

        if (!found){
            console.log("usernot found")

            responseJSON.response = "Data not found"
            responseJSON.data = ""
            res.send(responseJSON)
        }

    })
})

module.exports = router;