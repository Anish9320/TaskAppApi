const { createClient } = require("@supabase/supabase-js")
require("dotenv").config()

const supabaseUrl = process.env.SUPABASEURL;
const supabaseKey = process.env.SUPABASEKEY;


const supabase = createClient(supabaseUrl,supabaseKey);

const checkConnection = async () =>{
    try{
        const {data , error } = await supabase
        .from("task")
        .select("*")

        if(error){
            console.log("Error While Connecting: ",error)
            return false
        }
        if(data.length === 0){
            console.log('Connected to supabase')
            return true
        }
        console.log("connection created ")
        return true
    }
    catch(error){
        //supabase 
        console.log("Supabase connection error!",error.message)
    }
}
checkConnection()

module.exports = {supabase,checkConnection}