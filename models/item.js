const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    cname: { type: String, required: true },
    Payment: { type: String, required: true },
    Date: { type: String, required: true },
    invoiceNo: {type:String,required:true},
    items: [
        {
            itemname: { type: String, required: true },
            qty: { type: Number, required: true },
            price: { type: Number, required: true },
            total:{type:Number,required:true},
            hsn: { type: String, required: true }
        }
    ],
    totalitems:{type:Number , required:true}
});

module.exports.Item = mongoose.model('item', ItemSchema);
