const { BadRequestError } = require("../helpers/errors");
const { handleGetUserById } = require("../services/user");

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

module.exports = {
	getUserById,
};
