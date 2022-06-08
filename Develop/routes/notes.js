const notes = require("express").Router();
const path = require("path");
const uuid = require("../helpers/uuid");
const notesDatabase = require("../db/db.json");
const fs = require("fs");

notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  //readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
  //res.sendFile(path.join(__dirname, "./public/notes.html"));
  res.status(200).json(notesDatabase);
});

//POST Route for new note
// notes.post("/", (req, res) => {
//   console.log(`${req.method} request received to add a note`);
//   console.log(req.body);

//   const { title, text } = req.body;

//   if (req.body) {
//     const newNote = {
//       title,
//       text,
//       noteId: uuid(),
//     };

//     readAndAppend(newNote, "./db/db.json");
//     res.json(`Note added successfully`);
//   } else {
//     res.error(`You suck, ya jackass!`);
//   }
// });

notes.post("/", (req, res) => {
  console.log(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      noteId: uuid(),
    };

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data);

        parsedNotes.push(newNote);

        //Write updated note back to the file
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("Successfully updated notes!")
        );
      }
    });

    const response = {
      status: "success",
      body: newNote,
    };
    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting note");
  }
});

module.exports = notes;
// //./public/notes.html
