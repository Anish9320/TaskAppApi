const { createClient } = require("@supabase/supabase-js")

const supabaseUrl = 'https://qrbqqcxrmxnxncvfwknr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyYnFxY3hybXhueG5jdmZ3a25yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwMjQyMjUsImV4cCI6MjA1NDYwMDIyNX0.KSUl20RhNQkJOCl9ZO1R-FugxEbpOlg8CHjEPqNH9lg'


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