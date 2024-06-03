const pgp = require("pg-promise")();
const db = pgp({
	connectionString: process.env.DB_DSN,
	ssl: {
		rejectUnauthorized: false,
	},
});

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
