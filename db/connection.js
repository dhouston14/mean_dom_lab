const mongoose = require("mongoose");

var CarSchema = new mongoose.Schema({
  car: String,
  car_url: String,
  car_desc: String
});

mongoose.model("Car", CarSchema);

mongoose.connect("mongodb://localhost/mean_dom_lab_db", () => { //add err in "()" if you want to see an error!!
  console.log("You are connected");
});

module.exports = mongoose;
