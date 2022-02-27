const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    cardNumber: { type: String, required: true },
    cardType: { type: String, enum: ["Regular", "special"] },
    customerName: { type: String },
    status: { type: String, Default:"Active", enum: ["Active", "inactive"] },
    vision: { type: String },
    customerID: { type: String, ref:"customer"}
}, { timestamps: true });

module.exports = mongoose.model('Card', CardSchema)
