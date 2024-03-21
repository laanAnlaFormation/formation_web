const express = require("express");
const path = require("path");
const app = express();

require("dotenv").config();
const prismic = require("@prismicio/client");
const fetch = require("node-fetch");
const port = 3000;

const repo = process.env.PRISMIC_REPO;
const accessToken = process.env.PRISMIC_TOKEN;

const client = prismic.createClient(repo, {
	fetch,
	accessToken,
});

const homeController = require("./controllers/homeController");
const aboutController = require("./controllers/aboutController");
const contactController = require("./controllers/contactController");
const notFoundError = require("./controllers/notFoundError");
const paintingController = require("./controllers/paintingController");

const ManualVariableStorage = async () => {
	const [home, about, contact, painting, notFoundError] = await Promise.all([
		client.getSingle("home"),
		client.getSingle("about"),
		client.getSingle("contact"),
		client.getSingle("painting"),
		client.getSingle("notfounderror"),
	]);

	let assets = [];

	home.data.body.forEach((item) => {
		assets.push(item.primary.home_slice_image.url);
		assets.push(item.primary.home_slice_image2.url);
	});

	about.data.about_group.forEach((item) => {
		assets.push(item.about_image.url);
	});

	assets.push(contact.data.contact_image.url);

	const seo = {
		home: {
			title: home.data.title,
			description: home.data.description,
		},
		about: {
			title: about.data.title,
			description: about.data.description,
		},
		contact: {
			title: contact.data.title,
			description: contact.data.description,
		},
		painting: {
			title: painting.data.title,
			description: painting.data.description,
		},
		notFound: {
			title: notFoundError.data.title_seo,
			description: notFoundError.data.description,
		},
	};

	return { assets, seo };
};

ManualVariableStorage()
	.then(({ assets, seo }) => {
		global.assets = assets;
		global.seo = seo; // Stocker les assets pour une utilisation globale
	})
	.catch((error) => {
		console.error("Erreur lors de l'initialisation des assets:", error);
	});

app.set("views", path.join(__dirname, "/views/pages"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(require("./middlewares/loadGlobalData.js")(client));

app.use((req, res, next) => {
	res.locals.ctx = {
		prismic,
	};
	next();
});

//app.get("/", homeController.getHome(client));
app.get("/", async (req, res) => {
	try {
		const { seo } = await ManualVariableStorage(); // Récupérer les données SEO ici
		// global.assets = assets; // Mise à jour des assets si nécessaire
		homeController.getHome(client, seo.home)(req, res); // Passer les données SEO spécifiques à la page Home au contrôleur
	} catch (error) {
		console.error("Erreur lors de la récupération des informations SEO:", error);
		res.status(500).send("Erreur interne du serveur");
	}
});
//app.get("/painting", paintingController.getPainting(client));
app.get("/painting", async (req, res) => {
	try {
		const { seo } = await ManualVariableStorage(); // Récupérer les données SEO ici
		// global.assets = assets; // Mise à jour des assets si nécessaire
		paintingController.getPainting(client, seo.painting)(req, res); // Passer les données SEO spécifiques à la page Home au contrôleur
	} catch (error) {
		console.error("Erreur lors de la récupération des informations SEO:", error);
		res.status(500).send("Erreur interne du serveur");
	}
});
//app.get("/about", aboutController.getAbout(client));
app.get("/about", async (req, res) => {
	try {
		const { seo } = await ManualVariableStorage(); // Récupérer les données SEO ici
		// global.assets = assets; // Mise à jour des assets si nécessaire
		aboutController.getAbout(client, seo.about)(req, res); // Passer les données SEO spécifiques à la page Home au contrôleur
	} catch (error) {
		console.error("Erreur lors de la récupération des informations SEO:", error);
		res.status(500).send("Erreur interne du serveur");
	}
});
//app.get("/contact", contactController.getContact(client));
app.get("/contact", async (req, res) => {
	try {
		const { seo } = await ManualVariableStorage(); // Récupérer les données SEO ici
		// global.assets = assets; // Mise à jour des assets si nécessaire
		contactController.getContact(client, seo.contact)(req, res); // Passer les données SEO spécifiques à la page Home au contrôleur
	} catch (error) {
		console.error("Erreur lors de la récupération des informations SEO:", error);
		res.status(500).send("Erreur interne du serveur");
	}
});
//app.get("/404", notFoundError.getNotFoundError(client));
app.get("/404", async (req, res) => {
	try {
		const { seo } = await ManualVariableStorage(); // Récupérer les données SEO ici
		// global.assets = assets; // Mise à jour des assets si nécessaire
		notFoundError.getNotFoundError(client, seo.notFound)(req, res); // Passer les données SEO spécifiques à la page Home au contrôleur
	} catch (error) {
		console.error("Erreur lors de la récupération des informations SEO:", error);
		res.status(500).send("Erreur interne du serveur");
	}
});

app.get("/api/seo/:page", async function (req, res) {
	const pageName = req.params.page.toLowerCase();
	console.log(req.params); // Assurez-vous que la recherche est insensible à la casse
	const seoData = global.seo[pageName];

	if (seoData) {
		res.json(seoData);
	} else {
		res.status(404).json({ message: "SEO data not found for this page" });
	}
});

app.all("*", (req, res) => {
	res.redirect("/404");
});

app.listen(port, () => {
	console.log(`Example app listening on port http://localhost:${port}`);
});
