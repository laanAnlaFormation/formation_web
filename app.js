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
const workController = require("./controllers/workController");
const aboutController = require("./controllers/aboutController");
const contactController = require("./controllers/contactController");
const notFoundError = require("./controllers/notFoundError");
const paintingController = require("./controllers/paintingController");
const projectsController = require("./controllers/projectsController");
const illustrationsController = require("./controllers/illustrationsController");

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

app.get("/", homeController.getHome(client));
app.get("/work", workController.getWork(client));
app.get("/painting", paintingController.getPainting(client));
app.get("/illustrations", illustrationsController.getIllustrations(client));
app.get("/projects", projectsController.getProjects(client));
app.get("/about", aboutController.getAbout(client));
app.get("/contact", contactController.getContact(client));
app.get("/404", notFoundError.getNotFoundError(client));

app.all("*", (req, res) => {
	res.redirect("/404");
});

app.listen(port, () => {
	console.log(`Example app listening on port http://localhost:${port}`);
});
