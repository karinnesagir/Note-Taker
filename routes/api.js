const fs = require("fs");
const util = require("util");
const router = require("express").Router();


router.get("/notes", (req, res) => {

  fs.readFile("db/db.json", (err, data) => {
    // Crash terminal if there is an error
    if(err) throw err
    note = JSON.parse(data);
    res.json(note);
  })
});

// front end to back end
router.post("/notes", (req, res) => {



  fs.readFile("db/db.json", (err, data) => {
    if(err) throw err
    notes = JSON.parse(data);
    notes.push(req.body);

  fs.writeFile("db/db.json", JSON.stringify(notes), (err) => {
    if(err) throw err
    res.json(notes);
  });

  })
});


router.delete("/notes", (req, res) => {
  
});

module.exports = router;
