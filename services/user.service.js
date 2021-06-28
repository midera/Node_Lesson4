const User = require('../dataBase/User.models');

module.exports = {
    createUserInDb: (user) => User.create(user),

    getUsersFromDb: (query) => User.find(query),

    updateUser: (query, body) => User.updateOne(query, body),

    deleteUser: (query) => User.findOneAndRemove(query)
};
