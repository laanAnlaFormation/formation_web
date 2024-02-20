const prismic = require("@prismicio/client");

exports.getProjects = (client) => async (req, res) => {
	try {
		const document = await client.get({ filters: [prismic.filter.at("document.type", "projects")] });
		const [projects] = document.results;

		res.render("projects", {
			projects,
		});
	} catch (error) {
		console.error("Error fetching document:", error);
		res.status(500).send("An error occurred");
	}
};
