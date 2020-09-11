require("dotenv").config();
const mongoose = require("mongoose");
const pageURL = process.env.BRANDS_URL;
const mongoURI = process.env.MONGO_URI;
const Brand = require("./models/Brand");

const scrapeForBrands = require("./scrapers/scrapeForBrands");
const scrapeForPerfumes = require("./scrapers/scrapeForPerfumes");

mongoose
	.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("MongoDB Connected"))
	.catch(err => console.error(err));

// scrapeForBrands(pageURL)
scrapeForPerfumes([{ url: "https://www.fragrantica.com/perfume/Burberry/Burberry-Summer-for-Men-2011-11661.html" }])
	.then(brands => {
		// for (const brand of brands) {
		// 	const newBrand = new Brand(brand);
		// 	newBrand.save().catch(err => console.error(err));
		// 	console.log(`✔ Brand [ ${brand.name} ] added to DB..`);
		// }
		// scrapeForPerfumes(brands).then(perfumes => {});
	})
	.catch(err => console.error(err));

// scrapeBrandsUrl(pageURL)
// 	.then(data => {
// 		console.log(`✅ [${data.length}] URLs has been queued.`);
// 		scrapeBrands(data)
// 			.then(brands => {
// 				for (const brand of brands) {
// 					const newBrand = new Brand(brand);
// 					newBrand.save().catch(err => console.error(err));
// 					console.log(`✔ Brand [ ${brand.name} ] added to DB..`);
// 				}
// 			})
// 			.catch(err => console.error(err));
// 	})
// 	.catch(err => console.error(err));
