const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Tshirt = require('../models/tshirtModel');


exports.getAll = catchAsync(async (req, res, next) => {
	const data = await Tshirt.getAll();

    res.status(200).json({
        status: 'success',
        data
    });
});

exports.getOne = catchAsync(async (req, res, next) => {
	const id = req.params.id;
	const data = await Tshirt.getOneById(id);

    res.status(200).json({
        status: 'success',
        data
    });
});