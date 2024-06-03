const db = require("../db/db");

const handleGetCommentByBlogId = async (blogId) => {
	try {
		const query = `
            SELECT user_id, comment_id, text, created_at 
            FROM comment where blog_id = $1
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

const handlePostCommentByBlogId = async (blogId, userId, text) => {
	try {
		const query = `
           INSERT INTO comment (user_id, blog_id, text) 
           VALUES ($1, $2, $3)
        `;

		await db.none(query, [userId, blogId, text]);
	} catch (err) {
		if (err.code && err.code == "22P02") {
			throw new BadRequestError("invalid user id", 400);
		}

		console.error("error creating blogs: ", err);
		throw new InternalServerError("internal server error");
	}
};

module.exports = {
	handleGetCommentByBlogId,
	handlePostCommentByBlogId,
};
