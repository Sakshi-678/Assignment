const mongoose = require('mongoose');
const CardModel = require('../Models/CardModel');
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
        let { cardType, customerName, status, vision, customerID } = data


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

        let latestcard=await CardModel.find().sort({_id:-1}).limit(1);
        let a=(latestcard[0].cardNumber)
        let b=a.substr(0,a.length-1)
        let c=b+(parseInt(a[a.length-1])+1)
        
        let dataOf = { cardNumber:c, cardType, customerName, status, vision, customerID }

        const savedData = await CardModel.create(dataOf);
        return res.status(201).send({ status: true, message: "Successfully Created", data: savedData });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

//-----------------------------------------------------------------------------------------


const cardList = async (req, res) => {
    try {
        
        const card = await CardModel.find()
        if (Array.isArray(card) && card.length === 0) {
            return res.status(404).send({ status: false, message: 'No Card found' })
        }

       return res.status(200).send({ status: true, message: 'Card list', data: card })

    }catch(err){
        return res.status(500).send({ status: false, message: err.message })
 }
}

module.exports = { createCard, cardList }
