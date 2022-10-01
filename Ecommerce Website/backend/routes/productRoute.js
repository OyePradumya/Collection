const express = require('express');
const { getAllProducts, getProductDetails, updateProduct, deleteProduct, getProductReviews, deleteReview, createProductReview, createProduct, getAdminProducts, getProducts, getRecommandation, addService, getService } = require('../controllers/productController');
const { addWorkers } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const Product = require('../models/productModel')
const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/products/all').get(getProducts);
router.route('/get-recommandation').post(getRecommandation);
router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router.route('/add-service').post(addService);
router.route('/get-service').get(getService)
// router.route('/add-worker').post(isAuthenticatedUser,addWorkers);
router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route('/product/:id').get(getProductDetails);
router.route('/updatebid').post(async (req,res,next)=>{
    try{
        // update
        // console.log("hello")
        // console.log(req.body);
        const result = await Product.findById(req.body.productId);
        result.price = req.body.bidVal;
        await result.save();
        // Product.save();
        // console.log(result,"result");
        res.send({message:"data has been updated"});
    }
    catch(err){
        next(err);
    }
})

router.route('/review').put(isAuthenticatedUser, createProductReview);

router.route('/admin/reviews')
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReview);

module.exports = router;