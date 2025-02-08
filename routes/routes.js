const express = require('express')
const {addTask , getAllTaskByEmail, deleteTask, editTask ,getTaskById} = require("../controllers/taskController")
const router = express.Router()

//routes here 
router.get("/all-task/:email",getAllTaskByEmail)
router.post("/add-task",addTask)
router.put("/edit-task/:task_id",editTask)
router.delete("/delete-task/:task_id",deleteTask)
router.get("/getTaskById/:task_id",getTaskById)
module.exports = {router}