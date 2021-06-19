const express = require('express');
const userController = require('../controllers/userController');


const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/me', userController.protectRoute, userController.getMe);

module.exports = router;