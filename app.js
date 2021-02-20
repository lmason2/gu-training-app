//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Be Kind. Live a Meaning Life. Work on Your Weaknesses.";

const trainingDays = []

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    days: trainingDays
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const trainingDay = {
    date: req.body.date,
    am: req.body.am,
    pm: req.body.pm,
    reflection: req.body.reflection
  };

  trainingDays.push(trainingDay);

  res.redirect("/");
});

app.get("/days/:trainingDay", function(req, res) {
  const requestedDay = _.lowerCase(req.params.trainingDay);
  trainingDays.forEach(function(day) {
  const storedDay = _.lowerCase(day.date);
  if (requestedDay === storedDay) {
      res.render("post", {
        date: day.date,
        am: day.am,
        pm: day.pm,
        reflection: day.reflection
      })
    }
})
});
