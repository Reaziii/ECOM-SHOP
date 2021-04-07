const express = require('express');
const router = express.Router();
const banners = require('../model/Banners');



router.get('/',(req,res)=>{
    banners.find({},(err,res2)=>{
        if(err){
            res.send({message : 'error'});
        }
        else{
            res.send(res2);
        }
    })
});
router.get('/:id',(req,res)=>{
    banners.findById(req.params.id,(err,res2)=>{
        if(err){
            res.send({message : 'error'});
        }
        else{
            res.send(res2);
        }
    })
});


router.post('/',(req,res)=>{
    // console.log(name+type+img+status+url+product)
    const newbanners = new banners({
        name : req.body.name,
        type : req.body.type,
        img : req.body.img,
        status : req.body.status,
        url : req.body.url,
        product : req.body.product
    });

    newbanners.save().then(res2=>{
        res.send({message : 'saved'});
    });
});


router.delete('/',(req,res)=>{
    banners.remove({},(err,res2)=>{
        if(err) res.send({message : 'error'});
        else res.send({message : 'deleted'})
    })
})

router.delete('/:id',(req,res)=>{
    banners.deleteOne({_id : req.params.id},(err,res2)=>{
        if(err) res.send({message : 'error'});
        else res.send({message : 'deleted'})
    })
});

router.put('/:id/status',(req,res)=>{
	banners.findById(req.params.id,(err,res2)=>{
		if(err) res.send({message : 'error'});
		else{
			res2.status = !res2.status;
			res2.save();
			res.send({message : 'saved'})
		}
	})
})




module.exports = router;
