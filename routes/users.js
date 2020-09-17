// const express = require("express");
// const router = express.Router();
// const UserController = require("../controllers/UserController");
// const upload = require("../middlewares/fileUpload")

// router.post("/add-user", UserController.addUsers)
// router.post("/login", UserController.login);
// router.post("/update/:id", UserController.update);
// router.delete("/delete/:id", UserController.delete);
// router.get("/get-users", UserController.getUsers);
// router.get("/user/:id", UserController.getUserById);

// module.exports = router;


const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const upload = require("../middlewares/fileUpload")

router.post("/add-user",upload.single("photo"), UserController.addUsers)
router.post("/login", UserController.login);
router.post("/update/:id", UserController.update);
router.delete("/delete/:id", UserController.delete);
router.get("/get-users", UserController.getUsers);
router.get("/user/:id", UserController.getUserById);

module.exports = router;



// var express = require('express')
// var upload = require("../middlewares/fileUpload")
// const router = express.Router();

// router.post('/add-user', upload.single('photo'), function (req, res, next) {
//    res.send({
//        status:true,
//    })

// })
// module.exports = router

