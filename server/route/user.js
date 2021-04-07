const express = require('express');
const user = require('../model/user')
const router = express.Router();
const jwt = require('jsonwebtoken');
const SuperUserAuth = require('../authcheck/super');
const PublicUserAuth = require('../authcheck/public')
router.get('/me',PublicUserAuth,(req,res)=>{
    const id = jwt.verify(req.headers.auth,process.env.SECRET).id;
    user.findById(id,(err,res2)=>{
        if(err){
            res.send(err);
        }
        else{
            res2.password = null
            res.send(res2);
        }
    })
})

router.get('/',SuperUserAuth,(req,res)=>{
    user.find({},(err,res2)=>{
        if(err){
            res.send(err);
        }
        else{
            res2.password = null
            res.send(res2);
        }
    })
})


router.post('/registration',(req,res)=>{
    user.findById(req.body.username,(err,res2)=>{
        if(err){
            res.send({message : 'error'});
        }
        if(res2){
            res.send({message : 'user name already taken'})
        }
        else{
            user.find({email : req.body.email},(err,res3)=>{
                if(err){
                    res.send({message : 'error'})
                }
                else if(res3 && res3.length){
                    res.send({message : 'email already taken'});
                }  
                else{
                    const newuser = new user({
                        _id : req.body.username,
                        phone : req.body.phone,
                        email : req.body.email,
                        password : req.body.password,
                    })
                    newuser.save();
                    res.send(newuser);
                }
            })
        }
    })
})



router.post('/login',(req,res)=>{

    const username = req.body.username;
    const password = req.body.password;

    user.findById(username,(err,res2)=>{
        if(err){
            res.send({message : 'error'});
        }
        else if(!res2){
            res.send({message : 'username not found'})
        }
        else{
            if(res2.password!==password){
                res.send({message : 'password incorrect'});
            }
            else{

                var token = jwt.sign({ id: username }, process.env.SECRET, {
                    expiresIn: 864000
                });
                res2.password = null,
                res.send({
                    token,
                    auth : true,
                    user : res2,
                })




            }



        }
    })


})

router.delete('/:id',SuperUserAuth,(req,res)=>{
    const _id = req.params.id;
    user.findById(_id,(err,res2)=>{
        if(err){
            res.send({message : 'error'});
            
        }
        else if(!res2){
            res.send("notfound")
        }
        else if(res2.role==='super'){
            res.send({message : 'notpossible'})
        }
        else{
            user.remove({_id},(err,res3)=>{
                res.send({message : 'deleted'})
            });
            
        }
    })
})


router.put('/:id/role',(req,res)=>{
    const id = req.params.id;
    user.findById(id,(err,res2)=>{
        if(err){
            res.send({message : 'error'});
            
        }
        else if(!res2){
            res.send({message : 'not found'})
        }
        else{
            res2.role = req.body.role;
            res2.save();
            res.send({message : 'saved'})
        }


    })
})













module.exports = router;