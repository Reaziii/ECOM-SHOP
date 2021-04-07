const jwt = require('jsonwebtoken');

const user = require('../model/user')
const SuperUserAuth = (req,res,next) =>{
    try{
        const token = jwt.verify(req.headers.auth,process.env.SECRET);
        const id = token.id;
        user.findById(id,(err,res2)=>{
            if(err){
                res.send({message : 'error'});
            }
            else if(res2.role!=='super'){
                res.send({message : 'not authorized'});
            }
            else next();
        })
    }
    catch(err){
        res.send("not authorized")
    }





}

module.exports = SuperUserAuth