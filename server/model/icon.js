const mongoose = require('mongoose');

const iconSchema = new mongoose.Schema({
    classname : String,
  
})

const icon = mongoose.model('icons',iconSchema);

module.exports = icon;