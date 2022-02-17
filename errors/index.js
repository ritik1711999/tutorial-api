const BadRequestError = require("./badRequest");
const NotFoundError = require("./notFound");
const AuthError = require("./authError");

const errors = {
	BadRequestError,
	NotFoundError,
	AuthError,
};

module.exports = errors;
