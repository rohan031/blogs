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
			data: data[0],
		};

		return res.status(200).json(payload);
	} catch (err) {
		let payload = {
			error: true,
			message: err.message,
		};

		return res.status(err.statusCode).json(payload);
	}
};

module.exports = {
	getUserById,
};
