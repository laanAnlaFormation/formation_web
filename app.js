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

app.set("views", path.join(__dirname, "/views/pages"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(require("./middlewares/loadGlobalData.js")(client));

app.get("/", homeController.getHome(client));
app.get("/work", workController.getWork(client));
app.get("/about", aboutController.getAbout(client));
app.get("/contact", contactController.getContact(client));

app.listen(port, () => {
	console.log(`Example app listening on port http://localhost:${port}`);
});
