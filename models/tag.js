const mongoose = require("mongoose");
//  passportLocalMongoose = require("passport-local-mongoose");

const TagSchema = new mongoose.Schema({
	links : [
		{
			tag   : String,
			users : users.Type.ObjectId
		}
	]
});

module.exports = mongoose.model("Tag", TagSchema);
