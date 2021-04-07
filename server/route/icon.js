const express = require('express');

const router = express.Router();

const icon = require('../model/icon');
const SuperUserAuth = require('../authcheck/super');

router.get('/',(req,res)=>{
    icon.find({},(err,res2)=>{
        if(err){
            res.send({message : 'error'});
        }
        else{
            res.send(res2);
        }
    })
})

router.delete('/',(req,res)=>{
    icon.remove({},(err,res2)=>{
        if(err){
            res.send({message : 'error'});
        }
        else {
            res.send({message : 'deleted'})
        }
    })
})


router.post('/',SuperUserAuth,(req,res)=>{
    const classname = req.body.classname;

    icon.findOne({classname},(err,res2)=>{
        if(err){
            res.send({message : 'error'});
        }
        else if(res2){
            res.send({message : 'already'});
        }
        else{
            const newicon = new icon({
                classname
            });
            newicon.save().then(()=>{
                res.send({message : 'saved'})
            });
        }
    })
})


module.exports = router;