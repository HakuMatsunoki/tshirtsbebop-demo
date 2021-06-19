const express = require('express');
const orderController = require('../controllers/orderController');
const userController = require('../controllers/userController');


const router = express.Router();

router.post('/', userController.protectRoute, orderController.createOrder);
router.get('/', userController.protectRoute, orderController.getOrders);
router.get('/:id', userController.protectRoute, orderController.getOrder)

module.exports = router;