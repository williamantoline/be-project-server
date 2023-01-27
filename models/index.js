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
// db.tests = require("./test.model.js")(sequelize, Sequelize);
db.files = require("./file.model.js")(sequelize, Sequelize);
db.notes = require("./note.model.js")(sequelize, Sequelize);
db.todos = require("./todo.model.js")(sequelize, Sequelize);
db.todo_items = require("./todo_item.model.js")(sequelize, Sequelize);


db.users.hasMany(db.files, {
  as: "files",

});
db.files.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});


db.notes.hasOne(db.files, {
  foreignKey: "filableId",
  constraints: false,
  scope: {
    filable: "note",
  }
});
db.files.belongsTo(db.notes, {
  foreignKey: "filableId",
  constraints: false,
});


db.todos.hasOne(db.files, {
  foreignKey: "filableId",
  constraints: false,
  scope: {
    filable: "todo",
  }

});
db.files.belongsTo(db.todos, {
  foreignKey: "filableId",
  constraints: false,
});


// db.files.addHook("afterFind", findResult => {
//   if (!Array.isArray(findResult)) findResult = [findResult];
//   for (const instance of findResult) {
//     if (instance.filableType === "note" && instance.note !== undefined) {
//       instance.filable = instance.image;
//     } else if (instance.filableType === "todo" && instance.todo !== undefined) {
//       instance.filable = instance.todo;
//     }
//     // To prevent mistakes:
//     delete instance.note;
//     delete instance.dataValues.note;
//     delete instance.todo;
//     delete instance.dataValues.todo;
//   }
// });

// db.files.hasOne(db.notes, {
//   foreignKey: "id",
//   as: "note",
// });
// db.notes.hasOne(db.files, {
//   foreignKey: "filableId",
//   as: "file",
// });

// db.files.hasOne(db.todos, {
//   as: "todo",
// });
// db.todos.belongsTo(db.files, {
//   foreignKey: "id",
//   as: "file",
// });

// db.users.hasMany(db.notes, { as: "notes" });
// db.notes.belongsTo(db.users, {
//   foreignKey: "userId",
//   as: "user",
// });

// db.users.hasMany(db.todos, { as: "todos" });
// db.todos.belongsTo(db.users, {
//   foreignKey: "userId",
//   as: "user",
// });

db.todos.hasMany(db.todo_items, {as: "todo_items"});
db.todo_items.belongsTo(db.todos, {
  foreignKey: "todoId",
  as: "todo",
});

module.exports = db;