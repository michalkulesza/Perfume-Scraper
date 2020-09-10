const puppeteer = require("puppeteer");

const scrapeBrandsUrl = async pageURL => {
	const browser = await puppeteer.launch({
		headless: true,
		args: ["--no-sandbox"],
	});
	const page = await browser.newPage();

	try {
		await page.goto(pageURL);
		const urls = await page.evaluate(() => {
			let arr = [];

			const nodes = document.querySelectorAll(".nduList > p > a");
			nodes.forEach(brand => {
				arr.push(brand.href);
			});
			return arr;
		});

		return urls;
	} catch (error) {
		console.log(error);
	}

	browser.close();
};

module.exports = scrapeBrandsUrl;
