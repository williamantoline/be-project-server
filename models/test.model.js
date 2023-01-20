const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Test = sequelize.define("test", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        username: {
            type: Sequelize.STRING(255),
            unique: true,
            allowNull: false,
        },
    });
    return Test;
}