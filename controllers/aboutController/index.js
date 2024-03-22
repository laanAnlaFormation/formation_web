const prismic = require("@prismicio/client");

exports.getAbout = (client, seoData) => async (req, res) => {
	try {
		const document = await client.get({ filters: [prismic.filter.at("document.type", "about")] });
		const [about] = document.results;
		const globalAssets = global.assets;

		res.render("pages/about", {
			about,
			globalAssets,
			seo: seoData,
		});
	} catch (error) {
		console.error("Error fetching document:", error);
		res.status(500).send("An error occurred");
	}
};
