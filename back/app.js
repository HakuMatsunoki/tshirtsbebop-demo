const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
// const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./utils/errorHandler');
const userRoutes = require('./routes/userRoutes');
const tshirtRoutes = require('./routes/tshirtRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');


const app = express();

app.enable('trust proxy'); //heroku specific

app.use(cors());
app.options('*', cors());

app.use(express.static(path.join(__dirname, 'public')));

// app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'", 'https:', 'http:', 'data:', 'ws:'],
            baseUri: ["'self'"],
            fontSrc: ["'self'", 'https:', 'http:', 'data:'],
            scriptSrc: ["'self'", 'https:', 'http:', 'blob:'],
            styleSrc: ["'self'", "'unsafe-inline'", 'https:', 'http:'],
            imgSrc: ["'self'", 'data:', 'blob:'],
        },
    })
);


app.use(express.json({ limit: '10kb' }));

// app.use(cookieParser());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();

    next();
});

app.use('/api/users', userRoutes);
app.use('/api/tshirts', tshirtRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

app.all('*', (req, res, next) => {
    return next(new AppError(`Can't find ${req.originalUrl} on this server..`, 404));
});

app.use(globalErrorHandler);
module.exports = app;