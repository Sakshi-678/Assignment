const mongoose = require('mongoose')
const customerModel = require('../Models/CustomerModel');
const validNumber = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
const ObjectId = mongoose.Types.ObjectId

const isValid = function (value) {
    if (typeof value === "undefined" || value === null || value === Number) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}
const isValidObjectId = function (objectId) {
    return ObjectId.isValid(objectId)
};

const createCustomer = async (req, res) => {
    try {
        let data = req.body
        
        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Invalid request parameters.. Please Provide User Details" })
        }
        let { firstName, lastName, mobileNumber, DOB, emailID, address, customerId, status } = data

        if (!isValid(firstName)) {
            return res.status(400).send({ status: false, message: "Please Provide First Name" })
        }
        if (!isValid(lastName)) {
            return res.status(400).send({ status: false, message: "Please Provide last Name" })
        }
        if (!isValid(emailID)) {
            return res.status(400).send({ status: false, message: "Please Provide email" })
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailID.trim()))) {
            return res.status(400).send({ status: false, message: `Enter a valid email address` })
        }
        if (!isValid(mobileNumber)) {
            return res.status(400).send({ status: false, message: "Please Provide mobile" })
        }
        if (mobileNumber) {
            if (!(validNumber.test(mobileNumber))) {
                return res.status(400).send({ status: false, message: "Please Provide validNumber " })
            }
            if (!(DOB)) {
                return res.status(400).send({ status: false, message: 'Release DOB is required' })
            }
            if (!(/\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])/.test(DOB))) {
                return res.status(400).send({ status: false, msg: "wrong format you provide" })
            }
            if (!isValid(address)) {
                return res.status(400).send({ status: false, message: "Please Provide address" })
            }
            if (!isValid(customerId)) {
                return res.status(400).send({ status: false, message: "Please Provide CustomerId" })
            }
            if (!isValid(status)) {
                return res.status(400).send({ status: false, message: "Please Provide status" })
            }
            const isAlreadyUsed = await customerModel.findOne({ emailID, mobileNumber })
            if (isAlreadyUsed) {
                return res.status(400).send({ status: false, message: `Email or mobileNumber is Already used` })
            }
            let dataOf = { firstName, lastName, mobileNumber, DOB, emailID, address, customerId, status }

            const savedData = await customerModel.create(dataOf);
            return res.status(201).send({ status: true, message: "Successfully Created", data: savedData });
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
// ----------------------------------------------------------------------------------------------------

const getCustomer = async function (req, res) {

    try {
        const filterQuery = { status: "Active" }
        let data = await customerModel.find(filterQuery)
        if (data) {
            return res.status(200).send({ status: true, msg: "customer list", data: data })
        } else {
            res.status(400).send({ status: false, msg: "no customer found " })
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

// -----------------------------------------------------------------------------------------------

const deleteCustomer = async function (req, res) {
    try{
        let customerId = req.params.customerId;

        if (!isValidObjectId(customerId)) {
            return res.status(400).send({ status: false, message: `${customerId} is not a valid customer id`})
        };
        const customer = await customerModel.findOne({ _id: customerId, isDeleted: false })

        if (!customer) {
            return res.status(404).send({ status: false, message: `customer is not found` })
        }
       
        await customerModel.findOneAndUpdate({ _id:customerId }, { isDeleted: true, deletedAt: new Date() ,status:"Inactive"})
        return res.status(200).send({ status: true, message: `Success ${customerId} customer deleted successfully` })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = { createCustomer, getCustomer, deleteCustomer }
