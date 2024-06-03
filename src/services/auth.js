const { errors } = require("pg-promise");
const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BadRequestError, InternalServerError } = require("../helpers/errors");

const JWT_SECRET = process.env.SECRET_KEY_ACCESS_TOKEN;

const handleSignup = async (name, email, password) => {
	try {
		// Check if user already exists
		const existingUser = await db.oneOrNone(
			"SELECT * FROM users WHERE email = $1",
			[email]
		);
		if (existingUser) {
			throw new BadRequestError(
				"User already exists with this email",
				400
			);
		}

		// hashing password
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// inserting into db
		const insertQuery = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3);
  `;
		await db.none(insertQuery, [name, email, hashedPassword]);
	} catch (err) {
		if (err instanceof BadRequestError) {
			throw err;
		}

		console.error("Error creating user: ", err);
		throw new InternalServerError("Internal server error");
	}
};

const handleLogin = async (email, password) => {
	try {
		const user = await db.oneOrNone(
			"SELECT user_id, password FROM users WHERE email = $1",
			[email]
		);
		if (!user) {
			throw new BadRequestError("Invalid email or password", 400);
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new BadRequestError("Invalid email or password", 400);
		}

		const accessToken = jwt.sign({ userId: user.user_id }, JWT_SECRET, {
			expiresIn: "1h",
		});

		return {
			accessToken,
		};
	} catch (err) {
		throw err;
	}
};

module.exports = {
	handleSignup,
	handleLogin,
};
