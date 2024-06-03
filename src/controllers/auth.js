const { BadRequestError } = require("../helpers/errors");
const { validateSignup } = require("../helpers/validation");
const { handleSignup, handleLogin } = require("../services/auth");

const signup = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		// validate input
		await validateSignup(name, email, password);

		// create user
		await handleSignup(name, email, password);

		let payload = {
			error: false,
			message: "Successfully created user",
		};

		return res.status(201).json(payload);
	} catch (err) {
		let payload = {
			error: true,
			message: err.message,
		};

		return res.status(err.statusCode).json(payload);
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			throw new BadRequestError("invalid email or password", 400);
		}

		const { accessToken } = await handleLogin(email, password);
		let payload = {
			error: false,
			message: "",
			data: {
				accessToken,
			},
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
	signup,
	login,
};
