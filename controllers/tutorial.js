const { Tutorial, User } = require("../models");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllTuts = async (req, res) => {
  const tutorials = await Tutorial.findAll({
    include: [
      {
        model: User,
        attributes: {
          exclude: ["password", "id"],
        },
        required: true,
      },
    ],
  });
  res.status(StatusCodes.OK).json({ tutorials, count: tutorials.length });
};

const getTutById = async (req, res) => {
  const { id: tutorialId } = req.params;
  const { id: userId } = req.user;
  tutorial = await Tutorial.findOne({
    where: { id: tutorialId, userId: userId },
  });
  if (!tutorial) {
    throw new NotFoundError(`Tutorial with this id ${tutorialId} not found`);
  }
  res.status(StatusCodes.OK).json(tutorial);
};

const createTut = async (req, res) => {
  const { title, description } = req.body;
  const { id: userId } = req.user;
  if (!title || !description) {
    throw new BadRequestError("Please provide full information");
  }
  const tutorial = await Tutorial.create({
    title: title,
    description: description,
    userId: userId,
  });
  res.status(StatusCodes.CREATED).json(tutorial);
};

const updateTut = async (req, res) => {
  const { id: tutorialId } = req.params;
  const { id: userId } = req.user;
  if (Object.keys(req.body).length === 0) {
    throw new BadRequestError("Please provide attributes you want to update");
  }
  const tutorial = await Tutorial.findOne({
    where: {
      id: tutorialId,
      userId: userId,
    },
  });
  if (!tutorial) {
    throw new NotFoundError(`Tutorial with this id ${tutorialId} not found`);
  }
  await tutorial.update(req.body);
  return res.status(StatusCodes.OK).json({ message: "Updated successfully!" });
};

const deleteTutById = async (req, res) => {
  const { id: tutorialId } = req.params;
  const { id: userId } = req.user;
  const tutorial = await Tutorial.findOne({
    where: {
      id: tutorialId,
      userId: userId,
    },
  });
  if (!tutorial) {
    throw new NotFoundError(`Tutorial with this id ${tutorialId} not found`);
  }
  await tutorial.destroy();
  res
    .status(200)
    .json({ message: `tutorial with id : ${tutorialId} deleted successfully` });
};

const getTutsByUser = async (req, res) => {
  const { id: userId } = req.user;
  const tutorials = await Tutorial.findAll({
    where: {
      userId: userId,
    },
  });
  res.status(StatusCodes.OK).json({ tutorials, count: tutorials.length });
};

module.exports = {
  getAllTuts,
  getTutById,
  updateTut,
  deleteTutById,
  createTut,
  getTutsByUser,
};
