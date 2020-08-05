const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db-connection');
const User = require('./User');

const Chat = sequelize.define('Chat', {
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Chat.belongsTo(User);

module.exports = Chat;
