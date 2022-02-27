const mongoose = require('mongoose')
const cardModel = require('../Models/CardModel');
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

const createCard = async (req, res) => {
    try {
        let data = req.body
        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Invalid request parameters.. Please Provide User Details" })
        }
        let { cardNumber, cardType, customerName, status, vision, customerID } = data


        if (!isValid(cardType)) {
            return res.status(400).send({ status: false, message: "Please Provide cardtype " })
        }
        if (!isValid(customerName)) {
            return res.status(400).send({ status: false, message: "Please Provide customerName" })
        }

        if (!isValid(customerID)) {
            return res.status(400).send({ status: false, message: "Please Provide CustomerId" })
        }
        if (!isValid(status)) {
            return res.status(400).send({ status: false, message: "Please Provide status" })
        }
        if (!isValid(vision)) {
            return res.status(400).send({ status: false, message: "Please Provide vision" })
        }
        let dataOf = { cardNumber, cardType, customerName, status, vision, customerID }

        const savedData = await cardModel.create(dataOf);
        return res.status(201).send({ status: true, message: "Successfully Created", data: savedData });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createCard }
