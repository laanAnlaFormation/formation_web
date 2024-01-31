const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.send('<div style="color: green; font-weight: bold; text-transform: uppercase;">Hello World!</div>');
});

app.listen(port, () => {
	console.log(`Example app listening on port http://localhost:${port}`);
});
