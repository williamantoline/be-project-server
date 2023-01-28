const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todo", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
    });
    return Todo;
}