const prismic = require("@prismicio/client");

exports.getContact = (client) => async (req, res) => {
	try {
		const document = await client.get({ filters: [prismic.filter.at("document.type", "contact")] });
		const [contact] = document.results;

		res.render("contact", {
			contact,
		});
	} catch (error) {
		console.error("Error fetching document:", error);
		res.status(500).send("An error occurred");
	}
};
