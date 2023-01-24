const model = require("../models/index");

const index = async (req, res) => {
  // const allNotes = await model.notes.findall();
  res.send("notes").status(200);
}

module.exports = { index };