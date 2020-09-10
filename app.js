require("dotenv").config();
const pageURL = process.env.BRANDS_URL;

const scrapeBrands = require("./scrapers/scrapeBrands");

scrapeBrands(pageURL)
	.then(data => console.log(data))
	.catch(err => console.error(err));
