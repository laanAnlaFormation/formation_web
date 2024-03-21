const prismic = require("@prismicio/client");

exports.getWork = (client) => async (req, res) => {
	try {
		const document = await client.get({ filters: [prismic.filter.at("document.type", "work")] });
		const [work] = document.results;

		res.render("work", {
			work,
		});
	} catch (error) {
		console.error("Error fetching document:", error);
		res.status(500).send("An error occurred");
	}
};
