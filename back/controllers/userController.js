const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');


// AUTHORIZATION API
const signToken = function(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = function(id, res, statusCode) {
    const token = signToken(id);

    res.status(statusCode).json({
        status: 'success',
        token
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const data = req.body;
    const { name, phone, email, passwd, passwdConfirm } = data;

    // very basic validation
    if (!name || !phone || !email || !passwd || !passwdConfirm) return next(new AppError('Name, phone, email and password required..', 401));
    if (!/^[0-9]+$/.test(phone)) return next(new AppError('Invalid phone format..', 401));
    if (!/(.+)@(.+){2,}\.(.+){2,}/.test(email)) return next(new AppError('Invalid email..', 401));
    if (passwd !== passwdConfirm) return next(new AppError('Invalid password confirmation', 401));


    const userData = {
        name,
        phone,
        email,
        passwd
    };
    const { id } = await User.createOne(userData);
    createSendToken(id, res, 201);
});

exports.login = catchAsync(async (req, res, next) => {
    const data = req.body;
    const user = await User.getOne(data);

    if (!user || !await User.correctPasswd(user.passwd, data.passwd)) return next(new AppError('Wrong email or password', 401));

    createSendToken(user.id, res, 201);
});

exports.logout = catchAsync(async (req, res, next) => {
    // USED WITH COOKIE
    // res.cookie('jwt', 'loggedout', {
    //     expires: new Date(Date.now() + 1 * 1000),
    //     httpOnly: true
    // });

    res.status(200).json({
        status: 'success',
    });
});

exports.getMe = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const data = await User.getMe(userId);

    res.status(200).json({
        status: 'success',
        data
    });
});

exports.protectRoute = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } 
    // USED WITH COOKIE
    // else if (req.cookies.jwt) {
    //     token = req.cookies.jwt;
    // }

    if (!token) return next(new AppError('You are not logged in..', 401));

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return next(new AppError("User does no longer exist.", 401));
    req.user = user;

    next();
});
