const express = require('express');
const router = express.Router();

const multer = require('multer');
const SuperUserAuth = require('../authcheck/super')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'~'+file.originalname.split(/\s/).join(''));
    }
    
  })

const upload = multer({storage : storage});

router.post('/images',upload.array('file'),(req,res)=>{
  console.log(req.files)
    var ret = [];
	req.files.map((data)=>{
		ret.push(data.filename);
	})
	res.send(ret);
})

router.post('/image',upload.single('file'),SuperUserAuth,(req,res)=>{
    res.json(req.file.filename)
})


module.exports = router;