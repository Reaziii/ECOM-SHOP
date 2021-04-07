const moongoose = require('mongoose');
const catagoryShema = new moongoose.Schema({
    name : String,
    Subcatagories : {
        type : Number,
        default : 0,
    },
    iconid : Number,
    iconclass : String,
    created_at : {
        type : Date,
        default : Date.now()
    },
    SubcatagoriesId : [
        {
            type : moongoose.Schema.Types.ObjectId,
            ret : 'subcatagory'
        }
    ]


});

const catagory = moongoose.model('CATAGORY',catagoryShema);

module.exports = catagory;