const mongoose = require("./connection");
const seed_data = require("./seeds.json");

const Car = mongoose.model("Car");

Car.remove({}).then(() => {
  Car.collection.insert(seed_data).then(() => {
    process.exit()
  });
});
