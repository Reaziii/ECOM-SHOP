const jwt = require('jsonwebtoken');

const user = require('../model/user')
const PublicUserAuth = (req,res,next) =>{

   
    try{
        const token = jwt.verify(req.headers.auth,process.env.SECRET);
        next();
    }
    catch(err){
        res.send({message : 'notauth'})
    }





}

module.exports = PublicUserAuth