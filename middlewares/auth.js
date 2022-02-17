const jwt = require("jsonwebtoken");
const { AuthError } = require("../errors");

const authMiddleware = async (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization || !authorization.startsWith("Bearer ")) {
		throw new AuthError("No auth token found");
	}
	const token = authorization.split(" ")[1];
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = payload;
		next();
	} catch (err) {
		throw new AuthError("Problem occured while authorization");
	}
};

module.exports = authMiddleware;
