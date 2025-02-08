const express = require('express')
const {addTask , getAllTaskByEmail, deleteTask, editTask } = require("../controllers/taskController")
const router = express.Router()

//routes here 
router.get("/all-task/:email",getAllTaskByEmail)
router.post("/add-task",addTask)
router.put("/edit-task/:task_id",editTask)
router.delete("/delete-task/:task_id",deleteTask)
module.exports = {router}