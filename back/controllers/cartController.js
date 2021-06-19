const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Cart = require('../models/cartModel');


exports.addItem = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const { tshirtOptionsId, quantity } = req.body;

	await Cart.addItem(userId, tshirtOptionsId, quantity);

    res.status(200).json({
        status: 'success',
    });
});

exports.removeItem = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const itemId = req.params.id;

	await Cart.removeItem(userId, itemId);

    res.status(200).json({
        status: 'success',
    });
});

exports.clear = catchAsync(async (req, res, next) => {
    const userId = req.user.id;

    await Cart.removeAll(userId);

    res.status(200).json({
        status: 'success',
    });
});

exports.getContent = catchAsync(async (req, res, next) => {
	const userId = req.user.id;

	const data = await Cart.getAll(userId);

	res.status(200).json({
        status: 'success',
        data
    });
});


