//heres all logic
const {supabase } = require('../config/supabaseConfig')

const addTask = async (req,res) =>{
    try{

        const {email ,task_title ,task_desc, due_date, priority, status  } = req.body;
        
        if(!email || !task_title ||!task_desc || !due_date || priority == null || status == null){
            console.log(email,task_title,task_desc,due_date,priority,status)
            return res.status(500).send({message: "Please Provide Complete information!.."})
        }
        var task_id = Math.round(Math.random() * 1000000)
        
        const {data: taskInsert , error: taskInsertError} = await supabase
        .from("task")
        .insert(
            [
                {
                    task_id,
                    email,
                    task_title,
                    task_desc,
                    due_date,
                    priority,
                    status
                }
            ]
        )
        
        if(taskInsertError){
            return res.status(500).send({message: "Supabase Error while inserting data", error: taskInsertError.message})
        }
        
        return res.status(201).send({message: "Task created!"})
    }
    catch(error){
        return res.status(500).send({message: "Internal Seerver Error!",error: error.message})
    }
}

const getAllTask = async(req,res) =>{
    try{
        const {data: allTaskData, error: allTaskError} = await supabase
        .from("task")
        .select("*")

        if(allTaskError){
            return res.status(500).send({message: "Error while fetching all task", error: allTaskError.message})
        }
        if(allTaskData.length === 0 ){
            return res.status(400).json({message: "No Task Created!"})
        }
        return res.status(200).json(allTaskData)
    }
    catch(error){
       return res.status(500).send({message: "Internal Seerver Error!, while fetching",error: error.message})
    }
}

const editTask = async (req,res) =>{
    try{
        const { task_id } = req.params;
        const updateData = req.body;

        if(!task_id){
            return res.status(500).send({message: "Please Provide task - id"})
        }
        if(!updateData){
            return res.status(500).send({message: "Please provide update data!"})
        }

        const {data: updateTask , error: updateError} = await supabase
        .from("task")
        .update(updateData)
        .eq('task_id',task_id)
        .select("*")

        if(updateError){
            return res.status(500).send({message: "Error while updating task",error: updateError.message})
        }
        if(!updateTask || updateTask.length === 0){
            return res.status(404).send({message: "No Changes are made / No Task Found.."})
        }
        return res.status(200).json({message: "Updated Task."})

    }
    catch(error){
        return res.status(500).send({message: "Internal Seerver Error while edit..",error: error.message})
    }
}
const deleteTask = async (req,res)=>{
    try{
        const { task_id } = req.params;
        if(!task_id){
            return res.status(500).send({message: "Please Provide task - id"})
        }
        const {data: allTaskData, error: allTaskError} = await supabase
        .from("task")
        .select("*")
        .eq("task_id",task_id)

        if(allTaskError){
            return res.status(500).send({message: "Error while fetching all task", error: allTaskError.message})
        }
        if(allTaskData.length === 0 ){
            return res.status(400).json({message: "No task to delete!"})
        }
        const {data: deleteTask, error: deleteError} = await supabase
        .from("task")
        .delete()
        .eq("task_id",task_id)

        if(deleteError){
            return res.status(500).send({message: "Error from supabase while deleting. ", error: deleteError.message})
        }

        return res.status(200).send({message: "Task Deleted!!!!"})
    }
    catch(error){
        return res.status(500).send({message: "Internal Seerver Error while deleting",error: error.message})
    }
}
module.exports = {
    addTask,
    getAllTask,
    editTask,
    deleteTask
}