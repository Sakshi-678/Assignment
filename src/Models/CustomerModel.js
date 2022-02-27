const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({

    firstName: { type: String, required: "First name is Required", trim: true },
    lastName: { type: String, required: "Last name is Required", trim: true },
    mobileNumber: { type: Number, required: "Mobile is Required", trim: true },
    DOB: { type: Date, required: "dob is required" },
    emailID: { type: String, required: "Email is required", unique: true, trim: true },
    address: { type: String, required: "address is required" },
    customerId: { type: Number },
    deletedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
    status: { type: String, enum: ["Active", "inactive"] }
}, { timestamps: true });

module.exports = mongoose.model('Customer', CustomerSchema)