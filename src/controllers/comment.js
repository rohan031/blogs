const {
	handleGetCommentByBlogId,
	handlePostCommentByBlogId,
} = require("../services/comment");

const getCommentByBlogId = async (req, res) => {
	try {
		const { blogId } = req.params;
		if (!blogId) {
			throw new BadRequestError("invalid blog id", 400);
		}

		let data = await handleGetCommentByBlogId(blogId);
		let payload = {
			error: false,
			data,
		};

		return res.status(200).json(payload);
	} catch (err) {
		var payload = {
			error: true,
			message: err.message,
		};

		let statusCode = err.statusCode ?? 500;
		return res.status(statusCode).json(payload);
	}
};

const postCommentByBlogId = async (req, res) => {
	try {
		const { blogId } = req.params;
		const { userId } = req.user;
		const { text } = req.body;
		if (!blogId) {
			throw new BadRequestError("invalid blog id", 400);
		}

		let data = await handlePostCommentByBlogId(blogId, userId, text);
		let payload = {
			error: false,
			data,
		};

		return res.status(200).json(payload);
	} catch (err) {
		var payload = {
			error: true,
			message: err.message,
		};

		let statusCode = err.statusCode ?? 500;
		return res.status(statusCode).json(payload);
	}
};

module.exports = {
	getCommentByBlogId,
	postCommentByBlogId,
};
