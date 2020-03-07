require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const FolderService = require("./folder-services");
const NoteService = require("./note-services");

const app = express();
const bodyParser = require("body-parser");

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

///////////////////////POSTING FOLDERS/////////////////////////////////////
app.get("/folders", (req, res, next) => {
  const knexInstance = req.app.get("db");
  FolderService.getTitleById(knexInstance)
    .then(folders => {
      res.json(folders);
    })
    .catch(next);
});

app.post("/folders", (req, res, next) => {
  const { name } = req.body;
  const newFolder = { name };
  const knexInstance = req.app.get("db");

  for (const [key, value] of Object.entries(newFolder)) {
    if (value == null) {
      return res.status(400).json({
        error: { message: `Missing '${key}' in request body` }
      });
    }
  }
  knexInstance
    .insert(req.body)
    .returning("*")
    .into("folders")
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
//   FolderService.insertFolder(knexInstance)
//     .then(folder => {
//       res.status(201);
//       res.send("Your folder was Created");
//     })
//     .catch(next);
// });

app.get("/note", (req, res, next) => {
  const knexInstance = req.app.get("db");
  NoteService.getTitleById(knexInstance)
    .then(notes => {
      res.json(notes);
    })
    .catch(next);
});

////////////////////////POSTING NOTES//////////////////////////////////

app.post("/note", (req, res, next) => {
  const { name, content, folder } = req.body;
  const newNote = { name, content, folder };
  const knexInstance = req.app.get("db");

  for (const [key, value] of Object.entries(newNote)) {
    if (value == null) {
      return res.status(400).json({
        error: { message: `Missing '${key}' in request body` }
      });
    }
  }

  knexInstance
    .insert(req.body)
    .returning("*")
    .into("note")
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
app.get("/", (req, res) => {
  res.send("Hello World!");
  //   res.send("Hello, basic boilerplate!");
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});
module.exports = app;
