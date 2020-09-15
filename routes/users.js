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






// const express = require("express");
// const router = express.Router();
// const multer  = require("multer");
// const upload = require("../middlewares/fileUpload")

// router.use(express.static(__dirname));

// router.use(multer({dest:"uploads"}).single("photo"));
// router.post("/add-user", function (req, res, next) {

//     let filedata = req.body.photo;
//     console.log(filedata);

//     if(!filedata)
//         res.send("Ошибка при загрузке файла");
//     else
//         res.send("Файл загружен");
// });
// module.exports = router




var express = require('express')
var multer  = require('multer')
var upload = multer({ dest: 'uploads' })
const router = express.Router();


router.post('/add-user', upload.single('photo'), function (req, res, next) {
    console.log(req.file,"req.file");
    console.log(req.files,"req.filessssssssss");
    console.log(req.body,"req.body");
    return res.status(200).json({
        status: true
    })
})
module.exports = router


