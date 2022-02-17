const { StatusCodes } = require("http-status-codes");

class NotFoundError extends Error {
	constructor(message) {
		super(message);
		this.status = StatusCodes.NOT_FOUND;
	}
}

module.exports = NotFoundError;
