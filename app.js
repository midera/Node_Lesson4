const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const { PORT } = require('./constant/constant');

const { userRouter } = require('./router');
const { constant, respCode } = require('./constant');

const app = express();

_mongooseConnector();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));

app.listen(PORT, () => {
    console.log('server is work');
});

app.use('/users', userRouter);
app.use('*', _notFoundHandler);
app.use(_handleErrors);

// eslint-disable-next-line no-unused-vars
function _handleErrors(err, req, res, next) {
    res
        .status(err.status)
        .json({
            message: err.message || constant.UNKNOWN_ERROR,
            customCode: err.customCode || 0
        });
}

function _notFoundHandler(err, req, res, next) {
    next({
        status: err.status || respCode.NOT_FOUND,
        message: err.message || constant.ROUTE_NOT_FOUND
    });
}

function _mongooseConnector() {
    mongoose.connect('mongodb://localhost:27017/feb-2021', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
}
