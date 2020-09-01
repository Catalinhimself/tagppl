//requiriments
const express = require("express");
const app = express();
const mongoose = require("mongoose"),
	bodyparser = require("body-parser"),
	methodoverride = require("method-override");
const user = require("./models/user");
var userz;
//setings

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/tagppl", { useNewUrlParser: true });
app.use(express.static(__dirname + "/public"));
app.use(methodoverride("_method"));

//routes
app.get("/", (req, res) => {
	user.find({}, (err, users) => {
		if (err) throw err;
		res.render("index", {
			users : users,
			userz : userz
		});
	});
});
app.get("/login", (req, res) => {
	res.render("login", {
		userz : userz
	});
});
app.get("/signup", (req, res) => {
	res.render("signup", {
		userz : userz
	});
});
app.post("/login", (req, res) => {
	user.find(
		{
			username : req.body.username,
			password : req.body.password
		},
		(err, currentuser) => {
			if (err) throw err;
			console.log(currentuser);
			userz = currentuser[0];
		}
	);

	res.redirect("/");
});
app.post("/signup", (req, res) => {
	user.find(
		{
			username : req.body.username
		},
		(err, currentuser) => {
			if (err) throw err;
			if (currentuser.length > 0) {
				res.send('<a href="/">username taken</a>');
			} else {
				let newuser = {
					username : req.body.username,
					password : req.body.password
				};

				user.create(newuser, (err, obj) => {
					if (err) {
						console.log(err);
						res.redirect("/");
					} else {
						console.log(obj);
						res.redirect("/");
					}
				});
			}
		}
	);
});
//port
app.listen(3000, () => {
	console.log("server runs");
});
