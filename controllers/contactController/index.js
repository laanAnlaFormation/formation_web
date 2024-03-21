const prismic = require("@prismicio/client");

exports.getContact = (client, seoData) => async (req, res) => {
	try {
		const document = await client.get({ filters: [prismic.filter.at("document.type", "contact")] });
		const [contact] = document.results;
		const globalAssets = global.assets;

		res.render("contact", {
			contact,
			globalAssets,
			seo: seoData,
		});
	} catch (error) {
		console.error("Error fetching document:", error);
		res.status(500).send("An error occurred");
	}
};
