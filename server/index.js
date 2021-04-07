const express = require('express');
const dotenv = require('dotenv');
const app = express();
var cors = require('cors')
app.use(cors())
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const port = 8000
dotenv.config({path:'./.env'})
const db = process.env.DATABASE;
const mongoose = require('mongoose');
mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('mongode connected');
})
.catch(err=>{
    console.log('mongoose db not connected')
});
const catagories = require('./route/catagory')
const user = require('./route/user')
const coupon = require('./route/coupon');
const icon = require('./route/icon');
const upload = require('./route/upload');
const subcatagories = require('./route/subcatagory');
const product = require('./route/product');
const message = require('./route/message');
const banners = require('./route/banners');
//routers
app.use('/catagory',catagories);
app.use('/user',user);
app.use('/coupon',coupon);
app.use('/icon',icon);
app.use('/upload',upload);
app.use('/subcatagories',subcatagories);
app.use('/product',product);
app.use('/message',message);
app.use('/banners',banners);
app.use(express.static('uploads'));   
app.use('/images', express.static('uploads/images'));
app.get('/', (req, res) => {
    res.send('Server is running...')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

const users = require('./model/user');

users.find({role : 'super'},(err,res)=>{
    if(err){
        throw err;
    }
    else{
        if(res.length) return ;
        else{
            newuser = new users({
                role : 'super',
                _id : process.env.SUNAME,
                password : process.env.SPASSWORD,
                email : process.env.SEMAIL,
                phone : process.env.SPHONE,
            });
            newuser.save();
        }
    }
})
