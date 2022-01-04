const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campgrounds");

//MONGOOSE Connection
mongoose.connect("mongodb://localhost:27017/expertExpiditions");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection ERROR"));
db.once("open", () => {
  console.log("Connection to DB established");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    // we have 406 cities in cities.js dataset
    const random406 = Math.floor(Math.random() * 406);
    const camp = new Campground({
      //here admin_name is the State
      location: `${cities[random406].city},${cities[random406].admin_name}`,
      title: `${sample(descriptors)} ${sample(places)}`,
    });
    await camp.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});
