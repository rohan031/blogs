const db = require("../db/db");
const { InternalServerError } = require("../helpers/errors");

const handleGetBlogs = async () => {
	try {
		const query = `
            SELECT user_id, blog_id, title, text, created_at 
            FROM blog
        `;

		const data = await db.any(query);
		return data;
	} catch (err) {
		console.error("error getting blogs: ", err);
		throw new InternalServerError("internal server error");
	}
};

const handleGetBlogsById = async (blogId) => {
	try {
		const query = `
            SELECT user_id, blog_id, title, text, created_at 
            FROM blog where blog_id = $1
        `;

		const data = await db.any(query, [blogId]);
		return data;
	} catch (err) {
		if (err.code && err.code == "22P02") {
			throw new BadRequestError("invalid blog id", 400);
		}

		console.error("error getting blogs: ", err);
		throw new InternalServerError("internal server error");
	}
};

const handlePostBlog = async (userId, title, text) => {
	try {
		const query = `
           INSERT INTO blog (user_id, title, text) 
           VALUES ($1, $2, $3)
        `;

		await db.none(query, [userId, title, text]);
	} catch (err) {
		if (err.code && err.code == "22P02") {
			throw new BadRequestError("invalid user id", 400);
		}

		console.error("error creating blogs: ", err);
		throw new InternalServerError("internal server error");
	}
};

const handlePutBlog = async (title, text, blogId) => {
	try {
		const query = `
            UPDATE blog
            SET title=$1, text = $2
            WHERE blog_id=$3
        `;
		await db.none(query, [title, text, blogId]);
	} catch (err) {
		if (err.code && err.code == "22P02") {
			throw new BadRequestError("invalid blog id", 400);
		}

		console.error("error updating blogs: ", err);
		throw new InternalServerError("internal server error");
	}
};

const handleDeleteBlog = async (blogId) => {
	try {
		const query = `
        DELETE FROM blog 
        WHERE blog_id=$1
        `;

		await db.none(query, [blogId]);
	} catch (err) {
		if (err.code && err.code == "22P02") {
			throw new BadRequestError("invalid blog id", 400);
		}

		console.error("error deleting blogs: ", err);
		throw new InternalServerError("internal server error");
	}
};

module.exports = {
	handleGetBlogs,
	handleGetBlogsById,
	handlePostBlog,
	handlePutBlog,
	handleDeleteBlog,
};
