const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stringRequired = {
	type: String,
	required: true,
};

const brandSchema = new Schema({
	name: { type: String, required: true, unique: true },
	description: stringRequired,
	country: stringRequired,
	url: stringRequired,
	logo: stringRequired,
	perfumes: [
		{
			type: Schema.Types.ObjectId,
			ref: "Perfume",
		},
	],
});

module.exports = mongoose.model("Brand", brandSchema);
