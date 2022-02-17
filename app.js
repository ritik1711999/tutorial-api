require("dotenv").config();
require("express-async-errors");

const cors = require("cors");
const helmet = require("helmet");
const express = require("express");

const app = express();

const { tutorialRouter, authRouter } = require("./routes");
const sequelize = require("./db/connect");
const { Tutorial, User } = require("./models");

const { errorHandlerMiddleware, notFound } = require("./middlewares");

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/v1/", authRouter);
app.use("/api/v1/tutorials", tutorialRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

User.hasMany(Tutorial);
Tutorial.belongsTo(User);

const start = async () => {
	try {
		await sequelize.sync();
		app.listen(port, () => {
			console.log(`Server is listening on port ${port}`);
		});
	} catch (err) {
		console.log(err);
	}
};
start();
