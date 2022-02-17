const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res) => {
	let customError = {
		statusCode: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || "Something went wrong",
	};

	res.status(customError.statusCode).json({ message: customError.msg });
};

module.exports = errorHandlerMiddleware;
