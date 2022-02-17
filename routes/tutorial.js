const express = require("express");
const { authMiddleware } = require("../middlewares");

const {
	getAllTuts,
	getTutById,
	updateTut,
	deleteTutById,
	createTut,
	getTutsByUser,
} = require("../controllers/tutorial");

const router = express.Router();

router.get("/", getAllTuts);

router.get("/list", authMiddleware, getTutsByUser);

router.post("/", authMiddleware, createTut);

router.get("/:id", authMiddleware, getTutById);

router.patch("/:id", authMiddleware, updateTut);

router.delete("/:id", authMiddleware, deleteTutById);

module.exports = router;
