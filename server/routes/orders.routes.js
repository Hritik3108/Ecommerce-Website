const { orderPlaced, orderFailed, getAllOrderOfUser, getOrder, getAllOrders, updateOrder, deleteOrder, getOrderManage } = require("../controllers/orders.controller");
const { isAuthenticatedUser, authorizeAdminRole } = require("../middleware/auth")

const express = require('express');
const router =  express.Router();

router.route('/ecom/orderplaced').get(orderPlaced)
router.route('/ecom/orderfailed').get(orderFailed)
router.route('/ecom/user/orders').get(isAuthenticatedUser,getAllOrderOfUser)
router.route('/ecom/user/order/:orderId').get(isAuthenticatedUser, getOrder);

router.route('/ecom/orders').get(isAuthenticatedUser,authorizeAdminRole,getAllOrders)
router.route('/ecom/getorder/:orderId').get(isAuthenticatedUser, authorizeAdminRole, getOrderManage);
router.route('/ecom/deleteorder/:orderId').delete(isAuthenticatedUser, authorizeAdminRole, deleteOrder);
router.route('/ecom/updateorder/:orderId').put(isAuthenticatedUser,authorizeAdminRole,updateOrder)

module.exports = router;