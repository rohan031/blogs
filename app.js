require("dotenv").config();
const app = require("./src/cmd/server");

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, (err) => {
	if (err) {
		console.error("Error starting server:", err);
		return;
	}
	console.log("server is running at PORT:", PORT);
});
