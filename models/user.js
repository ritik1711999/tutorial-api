const { DataTypes } = require("sequelize");
const sequelize = require("../db/connect");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = sequelize.define("users", {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		unique: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true,
		},
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

User.beforeCreate(async function (user) {
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
});

User.prototype.sign = function () {
	return jwt.sign({ id: this.id, name: this.name }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	});
};

User.prototype.comparePassword = async function (enteredPassword) {
	const isMatch = await bcrypt.compare(enteredPassword, this.password);
	return isMatch;
};

module.exports = User;
