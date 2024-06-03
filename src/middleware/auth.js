const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../helpers/errors");
const { handleGetBlogsById } = require("../services/blogs");

const verifyToken = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

	if (!token) {
		return res
			.status(403)
			.json({ error: true, message: "No token provided!" });
	}

	jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN, (err, decoded) => {
		if (err) {
			console.log(err);
			return res
				.status(401)
				.json({ error: true, message: "Unauthorized!" });
		}

		req.user = decoded;
		next();
	});
};

const verifyPermissionUser = async (req, res, next) => {
	const { userId } = req.user;
	const { userId: toUpdateUser } = req.params;

	if (userId != toUpdateUser) {
		let payload = {
			error: true,
			message: "unauthorized",
		};
		return res.status(401).json(payload);
	}

	next();
};

const verifyPermissionBlogs = async (req, res, next) => {
	const { userId } = req.user;
	const { blogId } = req.params;

	try {
		let data = await handleGetBlogsById(blogId);
		if (data.length == 0) {
			throw new BadRequestError("blog not found", 404);
		}

		let uid = data[0].authorId;

		if (userId != uid) {
			throw new BadRequestError("unauthorized", 401);
		}

		next();
	} catch (err) {
		let payload = {
			error: true,
			message: err.message,
		};

		let statusCode = err.statusCode ?? 500;
		return res.status(statusCode).json(payload);
	}
};

module.exports = {
	verifyToken,
	verifyPermissionBlogs,
	verifyPermissionUser,
};
