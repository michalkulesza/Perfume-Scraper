const puppeteer = require("puppeteer");

const scrapeBrands = async brandUrls => {
	const browser = await puppeteer.launch({
		headless: false,
		args: ["--no-sandbox"],
	});
	let brands = [];
	const page = await browser.newPage();

	try {
		for (const url of brandUrls) {
			await page.goto(url, {
				waitUntil: "networkidle0",
			});
			await page.waitForSelector("#main-content");

			const obj = await page.evaluate(() => {
				//Name
				const nameDOM = document
					.querySelector("#main-content")
					.querySelector("h1").innerText;
				const name = nameDOM.slice(0, nameDOM.search("perfumes") - 1);

				//Description
				let description = "";
				document
					.querySelector(
						"#main-content > div.grid-x.grid-margin-x > div.small-12.medium-8.large-9.cell > div.grid-x.grid-margin-x > div.cell.small-12.medium-8"
					)
					.querySelectorAll("p")
					.forEach(node => {
						description = `${description}</br> ${node.innerText}`;
					});

				//Country
				const country = document.querySelector(
					"#main-content > div.grid-x.grid-margin-x > div.small-12.medium-8.large-9.cell > div.grid-x.grid-margin-x > div.cell.small-12.medium-4 > div > div.cell.small-7.small-offset-1.medium-12 > a:nth-child(1) > b"
				).innerText;

				//Logo
				const logo = document.querySelector(
					"#main-content > div.grid-x.grid-margin-x > div.small-12.medium-8.large-9.cell > div.grid-x.grid-margin-x > div.cell.small-12.medium-4 > div > div.cell.small-4.medium-12 > img"
				).src;

				//URL
				const url = window.location.href;

				return {
					name,
					description,
					country,
					url,
					logo,
				};
			});

			brands.push(obj);
		}
	} catch (error) {
		console.log(error);
	} finally {
		browser.close();
	}

	return brands;
};

module.exports = scrapeBrands;
