const prismic = require("@prismicio/client");

exports.getNotFoundError = (client, seoData) => async (req, res) => {
	try {
		const document = await client.get({ filters: [prismic.filter.at("document.type", "notfounderror")] });
		const [notFoundError] = document.results;

		res.render("404", {
			notFoundError,
			seo: seoData,
		});
	} catch (error) {
		console.error("Error fetching document:", error);
		res.status(500).send("An error occurred");
	}
};
