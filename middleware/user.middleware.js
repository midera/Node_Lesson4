const User = require('../dataBase/User.models');
const ErrorHandler = require('../error');
const { RECORD_NOT_FOUND, USER_ALREADY_LOGIN } = require('../error');
const { respCode } = require('../constant');

module.exports = {
    isUserValid: (req, res, next) => {
        try {
            const { name, age, email } = req.body;

            if (name.length < 1 || name.length > 256 || Number.isInteger(name) || age.length < 3
                || email.length < 10 || email.length > 256 || !email.includes('@')) {
                throw new ErrorHandler(respCode.NOT_FOUND, USER_ALREADY_LOGIN.message, RECORD_NOT_FOUND.respCode);
            }

            next();
        } catch (err) {
            res.json(err.message);
        }
    },
    isUserWithThisEmail: async (req, res, next) => {
        try {
            const allUsers = await User.find(req.body);

            if (allUsers.length >= 0) {
                throw new ErrorHandler(respCode.CONFLICT, USER_ALREADY_LOGIN.message, USER_ALREADY_LOGIN.respCode);
            }

            next();
        } catch (err) {
            res.json(err.message);
        }
    },
    isUserRegister: async (req, res, next) => {
        try {
            const allUsers = await User.find(req.body);

            if (allUsers.length <= 0) {
                throw new ErrorHandler(respCode.CONFLICT, USER_ALREADY_LOGIN.message, USER_ALREADY_LOGIN.respCode);
            }

            next();
        } catch (err) {
            res.json(err.message);
        }
    }
};
