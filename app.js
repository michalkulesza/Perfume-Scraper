require("dotenv").config();
const mongoose = require("mongoose");
const pageURL = process.env.BRANDS_URL;
const mongoURI = process.env.MONGO_URI;

const scrapeBrandsUrl = require("./scrapers/scrapeBrandsUrl");
const scrapeBrands = require("./scrapers/scrapeBrands");

mongoose
	.connect(mongoURI, { useNewUrlParser: true })
	.then(() => console.log("MongoDB Connected"))
	.catch(err => console.error(err));

scrapeBrandsUrl(pageURL)
	.then(data => {
		scrapeBrands(["https://www.fragrantica.com/designers/Robert-Piguet.html"])
			.then(brands => console.log(brands))
			.catch(err => console.error(err));
	})
	.catch(err => console.error(err));
