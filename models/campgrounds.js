const mongoose = require('mongoose')
const {Schema} = mongoose
const moment = require("moment");

const campGroundsSchema = new Schema({
  title:String,
  price:String,
  description:String,
  location:String,
  created_at:String
})

campGroundsSchema.pre('save',function(next){
  now = new moment().format("MMMM Do YYYY");
  if(!this.created_at){
    this.created_at = now 
  }
  next();
})

module.exports = mongoose.model('Campground',campGroundsSchema)