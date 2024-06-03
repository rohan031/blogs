class BadRequestError extends Error {
	constructor(message, status) {
		super(message);
		this.name = "BadRequestError";
		this.statusCode = status;
	}
}

class InternalServerError extends Error {
	constructor(message) {
		super(message);
		this.name = "InternalServerError";
		this.statusCode = 500;
	}
}

module.exports = {
	BadRequestError,
	InternalServerError,
};
