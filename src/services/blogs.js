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

module.exports = {
	handleGetBlogs,
	handleGetBlogsById,
};
