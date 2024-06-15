const { 
    getProducts, 
    addProduct,
    getOneProduct,
    saveShippingAddress,
    addToWishList, 
    getWishlistItems, 
    removefromWishList,
    removeProduct,
    updateProduct
 } = require('../controllers/products.controller');

const { isAuthenticatedUser, authorizeAdminRole } = require("../middleware/auth")

const express = require('express');
const  upload  = require('../middleware/multer');
const router =  express.Router();


router.route('/ecom/products').get(getProducts);
router.route('/ecom/product/:id').get(getOneProduct);
router.route('/ecom/addtowishlist/:productId').put(isAuthenticatedUser,addToWishList);
router.route('/ecom/removefromwishlist/:productId').put(isAuthenticatedUser,removefromWishList);
router.route('/ecom/wishlist').get(isAuthenticatedUser,getWishlistItems);
router.route('/ecom/saveaddress').post(isAuthenticatedUser,saveShippingAddress)

router.route('/ecom/addproduct').post(isAuthenticatedUser,authorizeAdminRole,upload.single('file'),addProduct);
router.route('/ecom/deleteproduct/:productId').delete(isAuthenticatedUser,authorizeAdminRole,removeProduct);
router.route('/ecom/updateproduct/:productId').put(isAuthenticatedUser,authorizeAdminRole,upload.single('file'),updateProduct);


module.exports = router;