const mongoose = require('mongoose');

const subcatSchema = new mongoose.Schema({
    img : String,
    name : String,
    parent : mongoose.Schema.Types.ObjectId,
    parentname : String,
    parenticon : String,

});

const subcat = mongoose.model('subcatagory',subcatSchema);

module.exports = subcat;