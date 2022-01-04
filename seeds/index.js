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
    //price random rumbers
    var max = 4999;
    var min = 1999;
    const price = Math.floor(Math.random() * (max - min + 1) + min);
    const camp = new Campground({
      //here admin_name is the State
      location: `${cities[random406].city},${cities[random406].admin_name}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/random/?forest,mountain/300x300",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper ornare odio, id ullamcorper eros fringilla sit amet. Aliquam vestibulum aliquet consequat. Nulla eros lorem, porta sit amet luctus at, venenatis at magna. ",
      price,
    });
    await camp.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});
