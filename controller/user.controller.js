const { userService } = require('../services');
const { respCode } = require('../constant/response-codes.enum');

module.exports = {

    createUser: async (req, res) => {
        try {
            await userService.createUserInDb(req.body);

            res.json(respCode.CREATED);
        } catch (err) {
            res.json(err.message);
        }
    },

    getUsers: async (req, res) => {
        try {
            const Users = await userService.getUsersFromDb(req.query);

            res.json(Users);
        } catch (err) {
            res.json(err.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            await userService.updateUser(req.query, req.body);

            res.json(respCode.UPDATED);
        } catch (err) {
            res.json(err.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            await userService.deleteUser(req.query);

            res.json(respCode.NO_CONTENT);
        } catch (err) {
            res.json(err.message);
        }
    }
};
