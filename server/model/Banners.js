const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    name : String,
    img : String,
    type : String,
    status : Boolean,
    url : String,
    product :String
});


const banners = mongoose.model('banners',bannerSchema);

module.exports = banners;