const express = require('express');
const router = express.Router();
const product = require('../model/product')
router.get('/',(req,res)=>{
    product.find({},(err,res2)=>{
        if(err){
            res.send({message : 'error'});
        }
        else{
            res.send(res2);
        }
    })
})


router.post('/',(req,res)=>{
    const newproduct = new product({
        name : req.body.name,
        stock : req.body.stock,
        price : req.body.price,
        thumbnail : req.body.thumbnail,
        imgs : [...req.body.imgs],
        catagoryid : req.body.catagoryid,
        subcatagoryid : req.body.subcatagoryid,
        catname : req.body.catname,
        caticon : req.body.caticon,
        subcatname : req.body.subcatname,

    })
    newproduct.save().then(res3=>{
        res.send({message : 'saved'});
    }).catch(err=>res.send(err));



})

router.delete('/',(req,res)=>{
    product.remove({},(err,res2)=>{
        res.send({message : 'deleted'})
    })
})
router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    product.remove({_id : id},(err,res2)=>{
        if(err) res.send({message : 'error'});
        res.send({message : 'deleted'})
    })
})
module.exports = router;