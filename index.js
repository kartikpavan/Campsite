const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

//MIDDLEWARES
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get('/',(req,res)=>{
	res.render('home')
})


app.listen(3000, () => {
  console.log("Listening on Port 3000");
});
