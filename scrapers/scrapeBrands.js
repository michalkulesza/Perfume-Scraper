const puppeteer = require("puppeteer");

const scrapeBrands = async pageURL => {
	const browser = await puppeteer.launch({
		headless: true,
		args: ["--no-sandbox"],
	});
	const page = await browser.newPage();

	try {
		await page.goto(pageURL);
		const brands = await page.evaluate(() => {
			let arr = [];

			const nodes = document.querySelectorAll(".nduList > p > a");
			nodes.forEach(brand => {
				arr.push({
					name: brand.innerText.replace("\n", ""),
					url: brand.href,
				});
			});
			return arr;
		});

		return brands;
	} catch (error) {
		console.log(error);
	}

	browser.close();
};

module.exports = scrapeBrands;
