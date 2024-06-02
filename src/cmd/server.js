const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

const router = require("../routes/router");
app.use(router);

// serving static assets
app.use(express.static(path.join(__dirname, "../../dist")));
// return all the request to react app
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../../dist", "index.html"));
});

module.exports = app;
