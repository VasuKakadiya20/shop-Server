const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
    cname: { type: String, required: true },
    Email: { type: String, required: false },
    phonenumber: { type: String, required: true }
});

exports.Client = mongoose.model('client', ClientSchema);
