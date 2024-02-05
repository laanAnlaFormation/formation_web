const prismic = require("@prismicio/client");

exports.getAbout = (client) => async (req, res) => {
	try {
		const document = await client.get({ filters: [prismic.filter.at("document.type", "about")] });
		const [about] = document.results;

		res.render("about", {
			about,
		});
	} catch (error) {
		console.error("Error fetching document:", error);
		res.status(500).send("An error occurred");
	}
};
