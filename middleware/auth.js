require("dotenv").config()
const checkAuth = (req,res,next) =>{
    const header = req.headers['auth']
    if(header !== process.env.AUTH_KEY){
        return res.status(403).send({message: 'Authentication Failed'})
    }
    next();
}
module.exports = checkAuth;