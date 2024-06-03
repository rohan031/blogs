const { BadRequestError } = require("../helpers/errors");
const { handleGetBlogs, handleGetBlogsById } = require("../services/blogs");

const getBlogs = async (req, res) => {
	try {
		let data = await handleGetBlogs();
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

const getBlogById = async (req, res) => {
	try {
		const { blogId } = req.params;
		if (!blogId) {
			throw new BadRequestError("invalid blog id", 400);
		}

		let data = await handleGetBlogsById(blogId);
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
	getBlogs,
	getBlogById,
};
