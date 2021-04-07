const express = require('express');
const message = require('../model/message');
const router = express.Router();
const PublicUserAut = require('../authcheck/public')
const jwt = require('jsonwebtoken');
const user = require('../model/user');
const SuperUserAuth = require('../authcheck/super')
router.get('/public',PublicUserAut,(req,res)=>{
    const auth = req.headers.auth;
    const decode = jwt.decode(auth);
    const uid = decode.id;

    message.findOne({userid : uid},(err,res2)=>{
        if(err){
            res.send({message : 'error'});
        }
        else res.send(res2);
    })
});

router.post('/public',PublicUserAut,(req,res)=>{
    const auth = req.headers.auth;
    const decode = jwt.decode(auth);
    const uid = decode.id;
    
    const mm = req.body.message;

    message.findOne({userid : uid},(err,res2)=>{
        if(err) res.send({message : err});
        else if(!res2){
            const newmessage = new message({
                userid : uid,
                message : [{
                    send : 0,
                    message : mm,
                    read : 1,
                }],
                lastupdate : Date.now(),
            })
            newmessage.save();
            res.send(newmessage);
        }
        else {
            res2.message.push({
                message : mm,
                send : 0,
                read : 1,

            });
            res2.lastupdate = Date.now();
            res2.save();
            res.send(res2);
        }
    })
    
});

router.post('/admin',SuperUserAuth,(req,res)=>{
    const auth = req.headers.auth;
    const decode = jwt.decode(auth);
    const uid = req.body.userid;
    
    const mm = req.body.message;

    message.findOne({userid : uid},(err,res2)=>{
        if(err) res.send({message : err});
        else if(!res2){
            const newmessage = new message({
                userid : uid,
                message : [{
                    send : 1,
                    message : mm,
                    read : 1,
                }],
                lastupdate : Date.now()
            })

            newmessage.save();
            res.send({message : 'sended'});
        }
        else {
            res2.message.push({
                message : mm,
                send : 1,
                read : 12,

            });
            console.log(res2.message)
            res2.lastupdate = Date.now();
            res2.save();
            res.send(res2);
        }
    })
    
})

router.delete('/',(req,res)=>{
    message.remove({},(err,res2)=>{
        if(err){
            res.send({message : 'error'});

        }
        else res.send({message : 'deleted'})
    })
})


router.get('/',SuperUserAuth,(req,res)=>{
    message.find({}).sort({lastupdate : -1}).exec((err,res2)=>{
        if(err) res.send({message : 'error'});
        else{
            res.send(res2);
        }
    })
})

router.get('/user/:id',SuperUserAuth,(req,res)=>{
    const userid  = req.params.id;

    message.findOne({userid},(err,res2)=>{
        if(err) res.send({message : 'error'});
        else {
            for(var i = res2.message.length-1;i>=0;i--){
                if(res2.message[i].read===0) break;
                res2.message[i].read = 0;
  

            }
            res2.save();
            res.send(res2);
        }
     
    })
})

router.get('/newmessage',SuperUserAuth,(req,res)=>{
    message.find({},(err,res2)=>{
        if(err) res.send({message : 'error'});
        else{
            var ans = 0;

            res2.forEach(data=>{
                data.message.forEach(value=>{
                    ans+=value.read;
                })


            })

            res.send(String(ans))




        }



    })
})

router.get('/fontmessage',SuperUserAuth,(req,res)=>{
    message.find({}).sort({lastupdate : -1}).exec((err,res2)=>{
        if(err) res.send({message : 'error'});

        else {
            var ret = [];
            res2.map(data=>{
                const value = {
                    userid : data.userid,
                    read : data.message[data.message.length-1].read,
                    message : data.message[data.message.length-1].message,
                }
                console.log(data.message[data.message.length-1]);
                ret.push(value);
            })

            res.send(ret);



        }

    })
})

module.exports = router;
