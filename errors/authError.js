const { StatusCodes } = require("http-status-codes");
class AuthError extends Error {
	constructor(message) {
		super(message);
		this.status = StatusCodes.UNAUTHORIZED;
	}
}

module.exports = AuthError;
