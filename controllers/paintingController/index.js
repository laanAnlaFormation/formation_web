const prismic = require("@prismicio/client");

exports.getPainting = (client, seoData) => async (req, res) => {
	try {
		const document = await client.get({ filters: [prismic.filter.at("document.type", "painting")] });
		const [painting] = document.results;
		const globalAssets = global.assets;

		res.render("painting", {
			painting,
			globalAssets,
			seo: seoData,
		});
	} catch (error) {
		console.error("Error fetching document:", error);
		res.status(500).send("An error occurred");
	}
};
