//requiriments
const express = require("express");
const app = express();
const mongoose = require("mongoose"),
	bodyparser = require("body-parser"),
	methodoverride = require("method-override");
const user = require("./models/user");
var userz;
//remove everything if second argument is unchanged
const seeddb = require("./seeds");
seeddb(8, false);
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
app.delete("/logout", (req, res) => {
	userz = null;
	res.redirect("/");
});
//🅾 working on⏲
//need to display all tags for a user
app.get("/profiles/:id/:decide/:filter", (req, res) => {
	user.find({ _id: req.params.id }, (err, obj) => {
		if (err) throw err;
		let usery = obj[0];
		user.find({ _id: usery[req.params.decide] }, (err, obj) => {
			if (err) throw err;
			res.render("profile", {
				userz     : userz,
				viewuser  : usery,
				linkslist : obj,
				view      : req.params.decide,
				filter    : req.params.filter
			});
		});
	});
});

app.post("/profiles/:id", (req, res) => {
	//add the user as person who tagged in taggedby list
	var additem = { tag: req.body.tag, _id: userz._id };
	user.findOneAndUpdate({ _id: req.params.id }, { $push: { taggedby: additem } }, (err, obj) => {
		(err) => console.log(err);
	});
	additem = { tag: req.body.tag, _id: req.params.id };
	//add this profile by tag in taggedlist
	user.findOneAndUpdate({ _id: userz._id }, { $push: { tagged: additem } }, (err, obj) => {});
	res.redirect("/");
});

app.get("/db", (req, res) => {
	user.find({}, (err, obj) => {
		(err) => console.log(err);
		res.render("dbviewer", { users: obj });
	});
});
//port
app.listen(3000, () => {
	console.log("server runs");
});
