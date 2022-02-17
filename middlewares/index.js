const errorHandlerMiddleware = require("./errorHandler");
const notFound = require("./notFound");
const authMiddleware = require("./auth");

module.exports = {
	errorHandlerMiddleware,
	notFound,
	authMiddleware,
};
