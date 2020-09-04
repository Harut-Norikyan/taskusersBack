const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/add-user",UserController.addUsers);
router.get("/get-users", UserController.getUsers);
module.exports = router;