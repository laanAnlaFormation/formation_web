const prismic = require("@prismicio/client");

exports.getIllustrations = (client) => async (req, res) => {
	try {
		const document = await client.get({ filters: [prismic.filter.at("document.type", "illustrations")] });
		const [illustrations] = document.results;

		res.render("illustrations", {
			illustrations,
		});
	} catch (error) {
		console.error("Error fetching document:", error);
		res.status(500).send("An error occurred");
	}
};
