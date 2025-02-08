const express = require("express")
const {checkConnection } = require("./config/supabaseConfig")
const checkAuth = require("./middleware/auth")
const {router} = require("./routes/routes")
const cors = require('cors')
//express
const app = express()

//middleare
app.use(checkAuth)//auth check
app.use(express.json()) //to handle data
app.use(express.urlencoded({ extended: false })) //to handle data
app.use(cors({
    origin: '*',
    methods : 'GET,POST,PUT,DELETE'
}))
//to check connection is created or not.
checkConnection()

//routes here
app.use("/api",router)
app.listen(3000,()=>{
    console.log("Server running")
})