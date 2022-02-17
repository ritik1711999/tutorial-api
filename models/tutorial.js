const { Sequelize } = require("sequelize");
const sequelize = require("../db/connect");

const Tutorial = sequelize.define("tutorials", {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

module.exports = Tutorial;
