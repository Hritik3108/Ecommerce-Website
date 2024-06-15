const { login, register,updateUserData, getAllUser, updateUser, deleteUser,getUser, contact} = require("../controllers/users.controller");
const { isAuthenticatedUser, authorizeAdminRole } = require("../middleware/auth")

const express = require('express');
const router =  express.Router();

router.route('/ecom/register').post(register);
router.route('/ecom/login').post(login);
router.route('/ecom/user/update').put(isAuthenticatedUser,updateUserData);
router.route('/ecom/contact').post(contact);

router.route('/ecom/users').get(isAuthenticatedUser,authorizeAdminRole,getAllUser);
router.route('/ecom/getuser/:userId').get(isAuthenticatedUser,authorizeAdminRole,getUser);
router.route('/ecom/updateUser/:userId').put(isAuthenticatedUser,authorizeAdminRole,updateUser);
router.route('/ecom/deleteUser/:userId').delete(isAuthenticatedUser,authorizeAdminRole,deleteUser);


module.exports = router;