const mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require("moment");
const { type } = require("express/lib/response");

const campGroundsSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  created_at: String,
});

campGroundsSchema.pre("save", function (next) {
  now = new moment().format("MMMM Do YYYY");
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

module.exports = mongoose.model("Campground", campGroundsSchema);
