const express = require('express');
const tshirtController = require('../controllers/tshirtController');

const router = express.Router();


router.get('/', tshirtController.getAll);
router.get('/:id', tshirtController.getOne);

module.exports = router;