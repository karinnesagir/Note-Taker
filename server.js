// const express = require('express');
// const path = require('path');
// const { clog } = require('./middleware/clog');
// // const api = require('./routes/index.js');

// const PORT = process.env.port || 3001;

// const app = express();

// Folder to retrieve CSS and JS Files
app.use(express.static("public"));// Folder to retrieve CSS and JS Files



// Middleware to parse the JSON data
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// PORT
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});

module.exports = app;

const path = require("path");
const router = require("express").Router();


// GET request
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
    // console.log("router get htmlroutes notes.html");
});

// Return to Homepage 
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
    // console.log("router get htmlroutes index.html");
});

module.exports = router;






// --------------




const uuid = require('../uuid-bin');

const express = require('express');

const PORT = 3001;
const reviews = require('./db/reviews');

const app = express();

// TODO: Implement middleware for the parsing of JSON data
app.use(express.json());


// TODO: Implement middleware for parsing of URL encoded data
app.use(express.urlencoded({ extended: true }));


// GET request for ALL reviews

var notesData;

app.get("/notes", (req, res) => {
    // Reads the notes from JSON file
    readFileAsync("db/db.json", "utf8").then(function (data) {
      // Parse data to get an array of objects
      notesData = JSON.parse(data);
      //
      res.json(notesData);
    });
});













// POST request to add a review

app.post("/notes", (req, res) => {
    readFileAsync("db/db.json", "utf8").then(function (data) {
      // Parse data to get an array of objects
      notesData = JSON.parse(data);
  
      let newNote = req.body;
      let currentID = notesData.length;
  
      newNote.id = currentID + 1;
      // Add new note to the array of note objects
      notesData.push(newNote);
  
      notesData = JSON.stringify(notesData);
  
      writeFileAsync("db/db.json", notesData).then(function (data) {
        console.log("Note has been added.");
      });
      res.json(notesData);
    });
});
  


app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);