const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const TodoItem = sequelize.define("todoItem", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        content: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        isChecked: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });
    return TodoItem;
}