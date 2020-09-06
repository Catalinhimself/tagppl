const mongoose = require("mongoose");
//  passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
	username    : String,
	password    : String,
	avatar      : String,
	membersince : { type: Date, default: Date.now },
	tagged      : [
		{
			tag  : String,
			user : String
		}
	],
	taggedby    : [
		{
			tag  : String,
			user : String
		}
	]
});

//UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
