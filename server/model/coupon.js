const mongoose = require('mongoose');


const couponSchema = new mongoose.Schema({
    name : String,
    discountAmmount : Number,
    startDate : String,
    endDate : String,
    active : Boolean,
});


const Coupon = mongoose.model('coupon',couponSchema);
module.exports = Coupon; 