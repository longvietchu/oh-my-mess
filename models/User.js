const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db-connection');
const Chat = require('./Chat');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

User.hasMany(Chat);

module.exports = User;
