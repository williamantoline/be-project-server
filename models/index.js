const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.tests = require("./test.model.js")(sequelize, Sequelize);
db.notes = require("./note.model.js")(sequelize, Sequelize);
db.todos = require("./todo.model.js")(sequelize, Sequelize);
db.todo_items = require("./todo_item.model.js")(sequelize, Sequelize);

db.users.hasMany(db.notes, { as: "notes" });
db.notes.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

db.users.hasMany(db.todos, { as: "todos" });
db.todos.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

db.todos.hasMany(db.todo_items, {as: "todo_items"});
db.todo_items.belongsTo(db.todos, {
  foreignKey: "todoId",
  as: "todo",
})

module.exports = db;