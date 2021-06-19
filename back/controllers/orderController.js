const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Order = require('../models/orderModel');
const Tshirt = require('../models/tshirtModel');


exports.createOrder = catchAsync(async (req, res, next) => {
    const userId = req.user.id
    const { paymentsId, deliveryId, tshirtsList } = req.body
    
	await Order.createOne(userId, paymentsId, deliveryId, tshirtsList);

    res.status(200).json({
        status: 'success',
    });
});

exports.getOrder = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const orderId = req.params.id;

	const [order] = await Order.getOne(userId, orderId);
	if (!order) next(new AppError('This order does not longer exist..', 503));

    const data = [];
    const tshirtList = order.tshirtsList;

    for (const item of tshirtList) {
        const optionsId = item.tshirtOptionsId;
        const quantity = item.quantity;
        const [tshirt] = await Tshirt.getOneByOptions(optionsId);

        data.push({
            id: tshirt.id,
            name: tshirt.name,
            price: tshirt.price,
            type: tshirt.type,
            color: tshirt.color,
            size: tshirt.size,
            quantity,
        });
    };

    res.status(200).json({
        status: 'success',
        data,
    });
});

exports.getOrders = catchAsync(async (req, res, next) => {
    const userId = req.user.id;

    const data = await Order.getAll(userId);

    res.status(200).json({
        status: 'success',
        data,
    });
});


