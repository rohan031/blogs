const { BadRequestError } = require("../helpers/errors");
const {
	handleGetUserById,
	handlePutUser,
	handleGetUser,
} = require("../services/user");

const getUserById = async (req, res) => {
	try {
		const { userId } = req.params;
		if (!userId) {
			throw new BadRequestError("Invalid user id", 400);
		}

		let data = await handleGetUserById(userId);
		let payload = {
			error: false,
			data,
		};

		return res.status(200).json(payload);
	} catch (err) {
		let payload = {
			error: true,
			message: err.message,
		};

		let statusCode = err.statusCode ?? 500;
		return res.status(statusCode).json(payload);
	}
};

const getUser = async (req, res) => {
	try {
		const { userId } = req.user;
		if (!userId) {
			throw new BadRequestError("Invalid user id", 400);
		}

		let data = await handleGetUser(userId);
		let payload = {
			error: false,
			data,
		};

		return res.status(200).json(payload);
	} catch (err) {
		let payload = {
			error: true,
			message: err.message,
		};

		let statusCode = err.statusCode ?? 500;
		return res.status(statusCode).json(payload);
	}
};

const putUser = async (req, res) => {
	try {
		const { name } = req.body;
		const { userId } = req.params;

		if (!name) {
			throw new BadRequestError("invalid name", 400);
		}

		await handlePutUser(name, userId);
		let payload = {
			error: false,
			message: "successfully updated user details",
		};

		return res.status(200).json(payload);
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
	getUserById,
	getUser,
	putUser,
};
