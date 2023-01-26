const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Note = sequelize.define("note", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        content: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        isLiked: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });
    return Note;
}