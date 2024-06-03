const pgp = require("pg-promise")();
const db = pgp(process.env.DB_DSN);

async function testConnection() {
	try {
		// Attempt to connect to the database
		const connection = await db.connect();
		connection.done(); // release the connection
		console.log("Connection successful");
	} catch (error) {
		console.error("Connection failed", error);
	}
}

testConnection();

module.exports = db;
