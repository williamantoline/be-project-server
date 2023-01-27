const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const File = sequelize.define("file", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        filableId: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        filableType: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        isLiked: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
    }, {
        instanceMethods: {
            getItem: function() {
              return this['get' + this.get('filableType').substr(0, 1).toUpperCase() + this.get('filableType').substr(1)]();
            }
          }
    });
    return File;
}