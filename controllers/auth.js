const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError, AuthError } = require("../errors");
const { User } = require("../models");

const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new BadRequestError("Please provide email and password");
	}
	const user = await User.findOne({
		where: {
			email: email,
		},
	});
	if (!user) {
		throw new NotFoundError(
			"User with these credentials does not exist please register"
		);
	}

	const verified = await user.comparePassword(password);

	if (verified) {
		const token = user.sign();
		res
			.status(StatusCodes.OK)
			.json({ message: "login Successfull!", token: token });
	} else {
		throw new AuthError("Incorrect password");
	}
};

const register = async (req, res) => {
	const { name, email, password } = req.body;
	const userExist = await User.findOne({ where: { email: email } });
	if (!userExist) {
		const user = await User.create({
			name: name,
			email: email,
			password: password,
		});
		res
			.status(StatusCodes.OK)
			.json({ user, message: "User registered Successfully" });
	} else {
		throw new BadRequestError("User already exist");
	}
};

module.exports = {
	login,
	register,
};
