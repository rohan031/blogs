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

module.exports = {
	handleGetCommentByBlogId,
};
