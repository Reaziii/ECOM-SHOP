const express = require('express');
const router = express.Router();
const subcat = require('../model/subcatagory')
const cat = require('../model/catagory')
const product = require('../model/product')
router.get('/',(req,res)=>{
    subcat.find({},(err,res2)=>{
        if(err) res.send({message : err});
        else res.send(res2);
    })
})

router.get('/:id',(req,res)=>{
    subcat.findById(req.params.id,(err,res2)=>{
        if(err){
            res.send({message : 'error'});
        }
        else{
            res.send(res2);
        }
    })
})


router.delete('/',(req,res)=>{
    subcat.remove({},(err,res2)=>{
        if(err) res.send({message : 'error'});
        else{
            res.send({message : 'deleted'})
        }
    })
})

router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    subcat.findById(id,(err,res2)=>{
        if(err){
            res.send({message : 'error'});
        
        }
        else if(!res2){
            res.send({message : 'notfound'});
        }
        else{
            const parentid = res2.parent;
            cat.findById(parentid,(err,res3)=>{
                if(err) res.send({message : 'error'});
                else {
                    for(var i = 0;i<res3.SubcatagoriesId.length;i++){
                        console.log(res3.SubcatagoriesId[i])
                        if(String(res3.SubcatagoriesId[i])===String(id)){
                            res3.SubcatagoriesId.splice(i,1);
                            res3.Subcatagories-=1;
                            break;
                        }
                    }
                    res3.save();

                    

                    product.deleteMany({subcatagoryid : id},(err,res5)=>{
                        if(err) res.send({message : 'error'});
                        else{
                            subcat.remove({_id : id},(err,res4)=>{
                                if(err){
                                    res.send({message : 'error'});
                                }
                                else{
                                    res.send({message : 'deleted'})
                                }
                            })
                        }
                    })





                }

            })
        }
    })
})

router.post('/',(req,res)=>{
    const parentid = req.body.parentid;
    cat.findById(parentid,(err,res2)=>{
        if(err){
            res.send({message : 'error'});
        }
        else if(!res2){
            res.send({message : 'parentnot found'});
        }
        else{
            subcat.find({name : req.body.name,parent : parentid},(err,res3)=>{
                if(err){
                    res.send({message : 'error'});
                }
                else if(res3 && res3.length){
                    res.send({message : 'already'});
                }
                else{
                    const newsubcat = new subcat({
                        name : req.body.name,
                        img : req.body.img,
                        parent : parentid,
                        parentname : res2.name,
                        parenticon : res2.iconclass,
                    });
                    newsubcat.save().then(res6=>{
                        res2.Subcatagories+=1;
                        res2.SubcatagoriesId.push(newsubcat._id);
                        res2.save();
                        res.send({message : 'saved'})
                    });


                }
            })



        }
    })
});





module.exports = router;