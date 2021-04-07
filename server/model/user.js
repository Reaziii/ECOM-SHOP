const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id : String,
    email : String,
    password : String,
    phone : String,
    role : {
        type : String,
        default : "public"
    }

})

const user = mongoose.model('user',userSchema);

module.exports = user;