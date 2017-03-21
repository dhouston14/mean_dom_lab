const mongoose = require("mongoose");

var CarSchema = new mongoose.Schema(
  {
    car: String,
    car_url: String,
    car_desc: String
  }
);

mongoose.model("Car", CarSchema);

mongoose.connect("mongodb://localhost/mean_dom_lab_db", (err) => { //add err in "()" if you want to see an error!!
  if(err) {
    console.log(err);
  } else {
    console.log("You are connected");
  }
});

module.exports = mongoose;
