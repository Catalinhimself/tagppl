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
mongoose.connect("mongodb://localhost:27017/tagppl", {
	useNewUrlParser    : true,
	useFindAndModify   : false,
	useCreateIndex     : true,
	useUnifiedTopology : true
});
app.use(express.static(__dirname + "/public"));
app.use(methodoverride("_method"));

//routes
app.get("/", (req, res) => {
	user.find({}, (err, users) => {
		if (err) throw err;
		if (userz) {
			res.render("index", {
				users : users,
				userz : userz
			});
		} else {
			res.render("homepage", {
				users : users,
				userz : userz
			});
		}
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
					password : req.body.password,
					avatar   : req.body.avatar
				};

				user.create(newuser, (err, obj) => {
					if (err) {
						console.log(err);
						res.redirect("/");
					} else {
						user.find(newuser, (err, currentuser) => {
							if (err) throw err;
							userz = currentuser[0];
						});
						res.redirect("/");
					}
				});
			}
		}
	);
});
app.get("/profiles/:id", (req, res) => {
	user.find({ _id: req.params.id }, (err, obj) => {
		if (err) throw err;
		res.render("profile", {
			userz    : userz,
			viewuser : obj[0]
		});
	});
});
app.get("/:filter", (req, res) => {
	res.send('<a href="/">' + req.params.filter + " currently unavailable</a>");
});
//port
app.listen(3000, () => {
	console.log("server runs");
});
