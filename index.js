const express = require("express");
const parser  = require("body-parser");
const hbs     = require("express-handlebars");
const mongoose = require("./db/connection.js");

const app = express();

const Car = mongoose.model("Car");

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");

app.use("/assets", express.static("public"));
app.use(parser.json({extended: true}));

app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));

// Root
app.get("/", (req, res) => {
  res.render("cars");
  // res.json(__dirname + "/index.html");
})

// Find all "Cars?"
app.get("/api/cars", function(req, res) {
  Car.find({}).then(function(cars) {
    res.json(cars)
  });
});

// Find one and Show details
app.get("/api/cars/:car", function(req, res) {
  Car.findOne({car: req.params.car}).then(function(car){
    res.json(car);
  });
});

// Create
app.post("/api/cars", function(req, res){
  Car.create(req.body).then(function(car){
    res.json(car);
  });
});

// change app.post to app.delete for DELETE
app.delete("/api/cars/:car", function(req, res){
  Car.findOneAndRemove({car: req.params.car}).then(function(){
    res.json({success: true});
    // res.redirect("/candidates");
  });
});

// change app.post to app.put for UPDATE
app.put("/api/cars/:car", function(req, res){
  Car.findOneAndUpdate({car: req.params.car}, req.body.car, {new: true}).then(function(car){
    res.json({success: true});
    // res.redirect("/candidates/" + candidate.name);
  });
});

// Listen and Port 3001 (See above Line ...)
app.listen(app.get("port"), () => {
  console.log("The Mean Dom App is Connected");
});
