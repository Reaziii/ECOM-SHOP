const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name : String,
    stock : {
        type : Number,
        default : 0
    },
    price : {
        type : Number,
        default : 0,
    },
    thumbnail : String,
    imgs : [
        {
            type : String,
        }
    ],
    catagoryid : mongoose.Schema.Types.ObjectId,
    subcatagoryid : mongoose.Schema.Types.ObjectId,
    catname : String,
    caticon : String,
    subcatname : String,

})

const product = mongoose.model('product',productSchema);
module.exports = product;