const prismic = require("@prismicio/client");

exports.getHome = (client, seoData) => async (req, res) => {
	try {
		const document = await client.get({ filters: [prismic.filter.at("document.type", "home")] });
		const [home] = document.results;
		const globalAssets = global.assets;

		res.render("home", {
			home,
			currentPage: "home",
			globalAssets,
			seo: seoData,
		});
	} catch (error) {
		console.error("Error fetching document:", error);
		res.status(500).send("An error occurred");
	}
};
