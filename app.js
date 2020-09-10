require("dotenv").config();
const pageURL = process.env.BRANDS_URL;

const scrapeBrandsUrl = require("./scrapers/scrapeBrandsUrl");

scrapeBrandsUrl(pageURL)
	.then(data => console.log(data))
	.catch(err => console.error(err));
