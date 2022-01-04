const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const Campground = require("./models/campgrounds");

//MIDDLEWARES
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

//MONGOOSE Connection
mongoose.connect("mongodb://localhost:27017/expertExpiditions");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection ERROR"));
db.once("open", () => {
  console.log("Connection to DB established");
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
});

app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

app.post("/campgrounds", async (req, res) => {
  const campgrounds = new Campground(req.body.campground);
  await campgrounds.save();
  res.redirect(`/campgrounds/${campgrounds._id}`);
});

app.get("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const campgrounds = await Campground.findById(id);
  res.render("campgrounds/show", { campgrounds });
});

app.get("/campgrounds/:id/edit", async (req, res) => {
  const { id } = req.params;
  const campgrounds = await Campground.findById(id);
  res.render("campgrounds/edit", { campgrounds });
});

app.put("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const campgrounds = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  res.redirect(`/campgrounds/${campgrounds._id}`);
});

app.delete("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect("/campgrounds");
});

//if no routes are specified then redirect to 404 page
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(3000, () => {
  console.log("Listening on Port 3000");
});
