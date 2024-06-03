const { BadRequestError } = require("../helpers/errors");
const {
	handleGetBlogs,
	handleGetBlogsById,
	handlePostBlog,
	handlePutBlog,
	handleDeleteBlog,
} = require("../services/blogs");

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

const postBlog = async (req, res) => {
	try {
		const { userId } = req.user;
		const { title, text } = req.body;
		if (!title || !text) {
			throw new BadRequestError("invalid title or text for blog", 400);
		}

		await handlePostBlog(userId, title, text);
		let payload = {
			error: false,
			message: "successfully created blog",
		};

		return res.status(201).json(payload);
	} catch (err) {
		var payload = {
			error: true,
			message: err.message,
		};

		let statusCode = err.statusCode ?? 500;
		return res.status(statusCode).json(payload);
	}
};

const putBlog = async (req, res) => {
	try {
		const { blogId } = req.params;
		const { title, text } = req.body;
		if (!title || !text) {
			throw new BadRequestError("invalid title or text for blog", 400);
		}

		await handlePutBlog(title, text, blogId);
		let payload = {
			error: false,
			message: "successfully updated blog",
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

const deleteBlog = async (req, res) => {
	try {
		const { blogId } = req.params;
		await handleDeleteBlog(blogId);

		let payload = {
			error: false,
			message: "successfully deleted blog",
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
	postBlog,
	putBlog,
	deleteBlog,
};
