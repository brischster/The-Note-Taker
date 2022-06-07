const notes = require("express").Router();
const path = require("path");

notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
  //res.sendFile(path.join(__dirname, "./public/notes.html"));
});

module.exports = notes;
// //./public/notes.html
