const express = require('express');
const cartController = require('../controllers/cartController');
const userController = require('../controllers/userController');


const router = express.Router();

router.post('/', userController.protectRoute, cartController.addItem);
router.get('/', userController.protectRoute, cartController.getContent);
router.delete('/:id', userController.protectRoute, cartController.removeItem);
router.delete('/', userController.protectRoute, cartController.clear);


module.exports = router;