const prismic = require("@prismicio/client");

exports.getPainting = (client) => async (req, res) => {
	try {
		const document = await client.get({ filters: [prismic.filter.at("document.type", "painting")] });
		const [painting] = document.results;

		res.render("painting", {
			painting,
		});
	} catch (error) {
		console.error("Error fetching document:", error);
		res.status(500).send("An error occurred");
	}
};
