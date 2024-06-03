const dns = require("dns");
const { promisify } = require("util");
const { BadRequestError } = require("./errors");

const resolveMx = promisify(dns.resolveMx);

// name validatio
const validateString = (str, len) => {
	if (!str || str.length < len) {
		return false;
	}
	return true;
};

// validate email
const validateEmail = async (email) => {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	if (!emailRegex.test(email)) {
		return false;
	}

	let domainName = email.split("@")[1];
	try {
		const mxRecords = await resolveMx(domainName);

		if (mxRecords.length < 1) {
			return false;
		}
	} catch (err) {
		// error resolving mx records
		console.log("error");
		console.error(err.message);
		return false;
	}

	return true;
};

// validate password
const validatePassword = (password) => {
	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$.!%*#?&:^_-]{8,15}$/;
	return passwordRegex.test(password);
};

const validateSignup = async (name, email, password) => {
	if (!validateString(name, 3)) {
		throw new BadRequestError("invalid name", 400);
	}

	if (!validatePassword(password)) {
		throw new BadRequestError(
			"Invalid password. Password should be between 8-15, and must contain one uppercase, one lowercase and a digit.",
			400
		);
	}

	if (!(await validateEmail(email))) {
		throw BadRequestError("Invalid email provided", 400);
	}
};

module.exports = {
	validateSignup,
};
