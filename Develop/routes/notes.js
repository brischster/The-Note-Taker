const notes = require("express").Router();
const path = require("path");
const uuid = require("../helpers/uuid");
// const notesDatabase = require("../db/db.json");
const fs = require("fs");
const { readAndAppend } = require("../helpers/fsUtils");

// notes.get("/", (req, res) => {
//   console.info(`${req.method} request received for notes`);
//   res.status(200).json(notesDatabase);
// });

notes.get("/", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json(JSON.parse(data));
    }
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
    res.json(`Tip added successfully`);
  } else {
    res.error("Error in adding tip");
  }
});

//     fs.readFile("./db/db.json", "utf8", (err, data) => {
//       if (err) {
//         console.error(err);
//       } else {
//         const parsedNotes = JSON.parse(data);

//         parsedNotes.push(newNote);

//         //Write updated note back to the file
//         fs.writeFile("./db/db.json", JSON.stringify(parsedNotes), (writeErr) =>
//           writeErr
//             ? console.error(writeErr)
//             : console.info("Successfully updated notes!")
//         );
//       }
//     });

//     const response = {
//       status: "success",
//       body: newNote,
//     };
//     console.log(response);
//     res.status(201).json(response);
//   } else {
//     res.status(500).json("Error in posting note");
//   }
// });

module.exports = notes;
// //./public/notes.html
