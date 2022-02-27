const express = require('express');
const router = express.Router();


const CustomerController = require('../Controllers/CutomerController')
const CardController = require('../Controllers/CardController')


//CUSTOMER
router.post('/register',CustomerController.createCustomer)
router.get('/customer',CustomerController.getCustomer)
router.delete('/deleteCustomer/:customerId',CustomerController.deleteCustomer)

//CARD
router.post('/create',CardController.createCard)

module.exports = router
