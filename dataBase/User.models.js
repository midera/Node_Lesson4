const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum } = require('../constant');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    }
}, { timestamps: true });

// eslint-disable-next-line func-names
userSchema.virtual('namePlusAge').get(function() {
    return `${this.name}  ${this.age}`;
});
module.exports = model(dataBaseTablesEnum.USER, userSchema);
