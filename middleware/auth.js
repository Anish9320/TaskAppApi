const checkAuth = (req,res,next) =>{
    const header = req.headers['auth']
    if(header !== 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='){
        return res.status(403).send({message: 'Authentication Failed'})
    }
    next();
}
module.exports = checkAuth;