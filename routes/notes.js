const notes = require("express").Router();
const path = require("path");
const uuid = require("../helpers/uuid");
const fs = require("fs");
const {
  readAndAppend,
  readFromFile,
  writeToFile,
} = require("../helpers/fsUtils");

notes.get("/", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json(JSON.parse(data));
    }
  });
});

notes.get("/:noteId", (req, res) => {
  const noteToDelete = req.params.noteId;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.noteId === noteToDelete);
      console.log(result);
      return result.length > 0
        ? res.json(result)
        : res.json("No note with that ID");
    });
});

notes.delete("/:noteId", (req, res) => {
  const noteToDelete = req.params.noteId;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.noteId !== noteToDelete);

      writeToFile("./db/db.json", result);

      res.json(`Item ${noteToDelete} has been deleted`);
    });
});

notes.post("/", (req, res) => {
  console.log(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      noteId: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully`);
  } else {
    res.error("Error in adding note");
  }
});

module.exports = notes;
// //./public/notes.html
