const express = require('express');

const router = express.Router();
const catagory = require('../model/catagory');
const subcat = require('../model/subcatagory')
const SuperUserAuth = require('../authcheck/super')
const product = require('../model/product')
router.get('/',async (req,res)=>{
    await catagory.find({},(err,res2)=>{
        if(err){
            res.send({message : 'error'});
        }
        else{
            res.send(res2);
        }
    })
})

router.get('/:id',async (req,res)=>{
    const id = String(req.params.id);
    await catagory.findById(id,(err,res2)=>{
        if(err){
            res.send({message : 'error'});
        }
        else if(!res2){
            res.send({message : 'not found'})
        }
        else{
            res.send(res2);
        }
    })
})
router.post('/',SuperUserAuth,(req,res)=>{
    
    catagory.findOne({name : req.body.name},(err,res3)=>{
        if(err) res.send('error');
        else if(res3) res.send({message : 'already'});

        else{
            const newcatagory = new catagory({
                name : req.body.name,
                iconid : req.body.iconid,
                iconclass : req.body.iconclass,
            })
            newcatagory.save();
            res.send({message : 'ok',newcatagory})
        }
    })
})
router.put('/:id',SuperUserAuth,(req,res)=>{
    subcat.updateMany({parent : {$in : req.params.id}},
        {parentname : req.body.name,parenticon:req.body.classname},(err,res3)=>{
            if(err){
                res.send({message : 'error'});
            }
            else{
                catagory.findById(req.params.id,(err,res2)=>{
                    if(err) {
                        res.send({message : 'error'});
                    }
                    else if(!res2){
                        res.send({message : 'not found'})
                    }
                    else{
                        res2.name = req.body.name;
                        res2.iconid = req.body.iconid;
                        res2.iconclass = req.body.classname;
                        res2.save().then(res5=>res.send({message : 'ok'})).catch(err=>console.log(err));      
                    }
                })
            }
    })
})

router.delete('/:id',SuperUserAuth,(req,res)=>{
    const id = req.params.id;

    catagory.findById(id,(err,res2)=>{
        if(err){
            res.send({message : 'error'});
            
        }
        else if(!res2){
            res.send({message : 'not found'});
        }
        else{
            const subccc = res2.SubcatagoriesId;
            subcat.deleteMany({_id : { $in: subccc}},(err,res3)=>{
                if(err){
                    res.send({message : 'error'});
                }
                else{
                    catagory.remove({_id : req.params.id},(err,res2)=>{
                        if(err){
                            res.send({message : 'errors'});
                            throw err;

                        }
                        else{
                            product.deleteMany({catagoryid : id},(err,res6)=>{
                                if(err){
                                    res.send({message : 'error'});
                                }
                                else {
                                    res.send({message : 'okk'})

                                }
                            })
                        }
                    })
                }
            })
        }
    })


})
router.delete('/',SuperUserAuth,(req,res)=>{
    catagory.remove({},(err,res2)=>{
        if(err){
            res.send({message : 'error'});
            throw err;

        }
        else{
            res.send({message : 'okk'})
        }
    })
})


module.exports = router

