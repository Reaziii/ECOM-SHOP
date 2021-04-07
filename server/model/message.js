const mongoose = require('mongoose');


const newMessage = new mongoose.Schema({
	userid : String,
	message : Array,
	lastupdate : Date,


})

const message = mongoose.model('message',newMessage);
module.exports = message;