// var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
    // Schema = mongoose.Schema,
    // autoIncrement = require('mongoose-auto-increment');

var OrderSchema = new mongoose.Schema({
    //{type: Number, default: 0, unique: true}
    // order_id: Number,
    token : String,
    purchased_item:String,
    total_purchased_item : Number,
    couponCode : String,
    delivery_address : String,
    delivery_date : String,
    delivery_time : String,
    amount_to_pay : Number,
    payableAmount : Number,
    savingAmount : Number,
    shipping_charge : Number,
    payment_mode : Number,
    placingdatetime : String,
    cancelleddatetime : String,
    paid : Number,
    email : String,
    razorpay_payment_id : String,
    razorpay_order_id : String,
    razorpay_signature : String,
    status : String   // 0-> Cancelled 1->Placed/Ready for Packing 2=>Processing/Ready for Shipping 
    //3->Shipped 4 ->Delivered
});
mongoose.model('Order',OrderSchema);
//OrderSchema.plugin(autoIncrement.plugin, { model: 'Order', field: 'order_id',startAt: 100,incrementBy: 1 });
module.exports = mongoose.model('Order');