const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "/views/pages"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
	res.render("index", { title: "Hey", message: "Hello there!" });
});

app.listen(port, () => {
	console.log(`Example app listening on port http://localhost:${port}`);
});
