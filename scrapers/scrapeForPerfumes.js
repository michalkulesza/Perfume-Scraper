const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

async function wait(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
}

const scrapeForPerfumes = async brands => {
	await puppeteer.use(StealthPlugin());
	const browser = await puppeteer.launch({
		headless: false,
		args: ["--no-sandbox"],
	});

	try {
		const page = await browser.newPage();
		//Get Perfume URLS
		for (const brand of brands) {
			await page.goto(brand.url, {
				waitUntil: "networkidle2",
			});
			await page.waitForSelector("#main-content");
			const perfumesData = await page.evaluate(() => {
				let arr = [];
				const perfumesContainer = document.querySelectorAll(".cell.text-left.prefumeHbox.px1-box-shadow");
				perfumesContainer.forEach(perfume =>
					arr.push({
						url: perfume.querySelector("a").href,
						sex: perfume.querySelectorAll(".flex-container.align-justify")[1].querySelectorAll("span")[0].innerText,
						year:
							perfume.querySelectorAll(".flex-container.align-justify")[1].querySelectorAll("span")[1].innerText * 1,
					})
				);
				return arr;
			});

			for (const perfumeData of perfumesData) {
				console.log("Waiting 5s");
				await wait(5000);
				await page.goto(perfumeData.url, {
					waitUntil: "networkidle0",
				});
				console.log("Waiting for selector");
				await page.waitForSelector("#container");
				const perfume = await page.evaluate(() => {
					console.log("Working");
					const name = document.querySelector("#col1 > div > div > h1 > span").innerText;

					let description = "";
					const descriptionElement = document
						.querySelector(`[itemprop*="description"]`)
						.querySelectorAll("p")
						.forEach(el => (description = `${description} ${el.innerText}`));

					// const sex = perfumeData.sex;
					// const year = perfumeData.year;
					const rating = document
						.querySelector(`[itemprop*="aggregateRating"]`)
						.querySelector(`[itemprop*="ratingValue"]`);

					return {
						name,
						description,
						// sex,
						// year,
						rating,
					};
				});
				console.log(perfume);
			}
		}

		// console.log(perfumeURLS);
	} catch (error) {
		console.log(error);
	} finally {
		browser.close();
	}
};

module.exports = scrapeForPerfumes;
