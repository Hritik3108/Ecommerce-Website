const { processPayment, paymentSuccess, paymentFailed } = require("../controllers/payment.controller");
const { isAuthenticatedUser, authorizeAdminRole } = require("../middleware/auth")

const express = require('express');
const router =  express.Router();

router.route('/ecom/payment').post(isAuthenticatedUser,processPayment)
router.route('/ecom/payment/success').get(paymentSuccess)
router.route('/ecom/payment/failed').get(paymentFailed)

module.exports = router;