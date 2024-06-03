class BadRequestError extends Error {
	constructor(message, status) {
		super(message);
		this.name = "BadRequestError";
		this.statusCode = status;
	}
}

module.exports = {
	BadRequestError,
};
