const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;

router.post("/", userController.register);
router.post("/v1", userController.login);
router.get("/", userController.getIdByToken, userController.getUserByToken);

module.exports = router;
