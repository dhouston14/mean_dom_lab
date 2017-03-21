const express = require("express");
const parser  = require("body-parser");
const hbs     = require("express-handlebars");
const mongoose = require("./db/connection.js");

const app = express();

const Car = mongoose.model("Car");

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");

app.use("/assets", express.static("public"));
app.use(parser.urlencoded({extended: true}));

app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));

app.get("/", (req, res) => {
  res.render("cars");
  // res.json(__dirname + "/index.html");
})

app.get("/api/cars", function(req, res) {
  Car.find({}).then(function(cars) {
    res.json(cars)
  });
});

app.get("/api/cars/:car", function(req, res) {
  Car.findOne({car: req.params.car}).then(function(car){
    res.json(car);
  });
});

app.listen(app.get("port"), () => {
  console.log("The Mean Dom App is Connected");
});
