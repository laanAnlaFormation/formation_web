const prismic = require("@prismicio/client");

exports.getNotFoundError = (client) => async (req, res) => {
	try {
		const document = await client.get({ filters: [prismic.filter.at("document.type", "notfounderror")] });
		const [notFoundError] = document.results;

		res.render("404", {
			notFoundError,
		});
	} catch (error) {
		console.error("Error fetching document:", error);
		res.status(500).send("An error occurred");
	}
};
