const {StatusCodes} = require("http-status-codes");

const notFound = (req, res) => {
	res.status(StatusCodes.NOT_FOUND).json({message : "Not Found"});
};

module.exports = notFound;