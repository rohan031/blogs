const db = require("../db/db");
const { InternalServerError, BadRequestError } = require("../helpers/errors");

const handleGetUserById = async (userId) => {
	try {
		const query = `
        WITH UserData AS (
            SELECT name
            FROM users
            WHERE user_id = $1
        ),
        BlogData AS (
            SELECT json_agg(json_build_object('id', blog_id, 'title', title, 'text', text, 'created_at', created_at)) AS data
            FROM blog
            WHERE user_id = $1
        )
        SELECT u.name, COALESCE(b.data, '[]'::json) AS blogs
        FROM UserData u
        CROSS JOIN BlogData b;`;

		const data = await db.any(query, [userId]);
		return data;
	} catch (err) {
		if (err.code && err.code == "22P02") {
			throw new BadRequestError("invalid user id", 400);
		}

		console.error("error queriying db: ", err);
		throw new InternalServerError("internal server error");
	}
};

const handleGetUser = async (userId) => {
	try {
		const query = `
           SELECT user_id as "userId", name, email
           FROM users 
           WHERE user_id=$1
        `;

		const data = await db.any(query, [userId]);
		return data;
	} catch (err) {
		if (err.code && err.code == "22P02") {
			throw new BadRequestError("invalid user id", 400);
		}

		console.error("error updating user: ", err);
		throw new InternalServerError("internal server error");
	}
};

const handlePutUser = async (name, userId) => {
	try {
		const query = `
            UPDATE users
            SET name=$1
            WHERE user_id=$2
        `;
		await db.none(query, [name, userId]);
	} catch (err) {
		if (err.code && err.code == "22P02") {
			throw new BadRequestError("invalid user id", 400);
		}

		console.error("error updating user: ", err);
		throw new InternalServerError("internal server error");
	}
};

module.exports = {
	handleGetUserById,
	handlePutUser,
	handleGetUser,
};
