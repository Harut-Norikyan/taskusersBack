const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/add-user",UserController.addUsers);
router.post("/login", UserController.login);
router.post("/update/:id", UserController.update);
router.delete("/delete/:id", UserController.delete);
router.get("/get-users", UserController.getUsers);
router.get("/user/:id", UserController.getUserById);


module.exports = router;