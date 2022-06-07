const express = require("express");
const path = require("path");
const api = require("./routes/index.js");
const fs = require("fs");
const util = require("util");
//const { clog } = require("./middleware/clog");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);
//app.use(clog);

app.use(express.static("public"));

//GET Route for Homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) => {
  console.info(`${req.method} request received for notes`);
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//Wildcard route create if I have time
// app.get('*', (req, res) =>
// res.sendFiles(path.join(__dirname, 'public/pages/404.html')));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
