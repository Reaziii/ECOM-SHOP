const express = require('express');
const router = express.Router();
const coupon = require('../model/coupon');
const SuperUserAuth = require('../authcheck/super');

const middatechecker = require('../utils/aboutdate')

router.get('/',SuperUserAuth,(req,res)=>{
    coupon.find({},(err,res2)=>{
        if(err) res.send({message : err});
        else {
            for(var i = 0;i<res2.length;i++){
                res2[i].active = middatechecker(res2[i].startDate,res2[i].endDate);
            }
            res.send(res2);
        }
    })
});

router.get('/:name',(req,res)=>{
    const name = req.params.name;
    coupon.findOne({name},(err,res2)=>{
        if(err) res.send({message : 'error'});
        else if(!res2){
            res.json({message : 'not found'})
        }
        else {
            res2.active = middatechecker(res2.startDate,res2.endDate);
            if(middatechecker(res2.startDate,res2.endDate)){
                res.send({message : 'ok',discountAmmount : res2.discountAmmount});
            }
            else res.send({message : 'not'})
        }
    })
});

router.post('/',SuperUserAuth,(req,res)=>{
    const name = req.body.name;
    const discountAmmount = req.body.discountAmmount;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    coupon.findOne({name : name},(err,res2)=>{
        if(err) res.send({message : 'error'});
        else if(res2){
            res.send({message : 'found'})
        }
        else{
            const newcoupon = new coupon({
                name,
                discountAmmount,
                startDate,
                endDate,
            })
            newcoupon.save();
            res.send(newcoupon);
        }
    })
    
});

router.delete('/',SuperUserAuth,(req,res)=>{
    coupon.remove({},(req,res2)=>{
        res.send({message : 'deleted'})
    })
})
router.delete('/:id',SuperUserAuth,(req,res)=>{
    const _id = req.params.id;
    
    coupon.remove({_id},(err,res2)=>{
        if(err){
            res.send({message : 'err'})
        }
        else res.send({message : 'deleted'})
    })
})
router.put('/:id',SuperUserAuth,(req,res)=>{
    const id = req.params.id;
    const name = req.body.name;
    const discountAmmount = req.body.discountAmmount;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    coupon.findById(id,(err,res2)=>{
        if(err){
            res.send({message : 'error'})
        }
        else if(!res2){
            res.send({message : 'notfound'});
        }
        else{
            res2.name = name;
            res2.discountAmmount = discountAmmount;
            res2.startDate = startDate;
            res2.endDate = endDate;
            res2.save();
            res.send({message : 'edited'});

        }
    })
})


module.exports = router;