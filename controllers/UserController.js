const User = require("../models/Users");
const Images = require("../models/Images");
const jwt = require("jsonwebtoken");

module.exports = {

    // addUsers: async (req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "*")

    // try {
    //     const { firstName, lastName, email, psw, phone } = req.body;
    //     const userByEmail = await User.find({ email });
    //     const errors = {};
    //     if (!firstName) {
    //         errors.firstName = "First name is required";
    //     }
    //     if (!lastName) {
    //         errors.lastName = "Last name is required";
    //     }
    //     if (!email) {
    //         errors.email = "Email is required";
    //     }
    //     if (!phone) {
    //         errors.phone = "Phone is required";
    //     }
    //     if (!psw) {
    //         errors.psw = "Password is required";
    //     }
    //     if (userByEmail.length) {
    //         errors.email = "Email already exists in database";
    //     }
    //     if (Object.keys(errors).length) {
    //         return res.send({
    //             status: "error",
    //             errors,
    //         });
    //     };
    //     const user = await User.create({ firstName, lastName, email, psw, phone});
    //     res.send({
    //         status: "done",
    //         user,
    //     });

    // } catch (error) {
    //     next(error)
    // }
    // },

    addUsers: async (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*")

        try {
            const { firstName, lastName, email, psw, phone, imgId, path } = req.body;
            const img = req.file;
            console.log(img);
            if (img) {
                const imgFromUser = await Images.create({ name: img.filename, path : img.path});
                console.log(imgFromUser,"imgFromUser");
                res.send({
                    status: true,
                    id : imgFromUser._id,
                    path : imgFromUser.path
                })
            }
            const userByEmail = await User.find({ email });
            const errors = {};
            if (!firstName) {
                errors.firstName = "First name is required";
            }
            if (!lastName) {
                errors.lastName = "Last name is required";
            }
            if (!email) {
                errors.email = "Email is required";
            }
            if (!phone) {
                errors.phone = "Phone is required";
            }
            if (!psw) {
                errors.psw = "Password is required";
            }
            if (userByEmail.length) {
                errors.email = "Email already exists in database";
            }
            if (Object.keys(errors).length) {
                return res.send({
                    status: "error",
                    errors,
                });
            };
            const user = await User.create({ firstName, lastName, email, psw, phone, imgId, path });
            res.send({
                status: "done",
                user,
            });

        } catch (error) {
            next(error)
        }
    },

    login: async (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*")
        try {
            const { email, psw } = req.body;
            const user = await User.findOne({ $and: [{ email }, { psw }] });
            if (user) {
                const token = jwt.sign({ id: user._id },
                    "secret_this_should_be_longer",
                    { expiresIn: "1h" });
                return res.send({
                    status: "done",
                    token,
                    user,
                });
            } else {
                res.send({
                    status: "Wrong email or password"
                })
            }
        } catch (error) {
            next(error)
        };
    },

    getUsers: async (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*")
        try {
            const users = await User.find({});
            return res.status(200).json(users)
        } catch (error) {
            next(error)
        };
    },

    update: async (req, res, next) => {
        try {
            console.log(req.params);
            const { id } = req.params;
            const { firstName, lastName, email, psw, phone } = req.body;
            const errors = {};
            const userById = await User.findById(id)
            const userByEmail = await User.find({ email });
            console.log(userByEmail);
            if (!firstName) {
                errors.firstName = "First name is required";
            };
            if (!lastName) {
                errors.lastName = "Last name is required";
            };
            if (!email) {
                errors.email = "Email is required";
            };
            if (userByEmail.length > 1) {
                errors.email = "Email already exists in database";
            };
            if (!phone) {
                errors.phone = "Phone is required";
            };
            if (Object.keys(errors).length) {
                return res.send({
                    status: "error",
                    errors,
                });
            };
            User.findByIdAndUpdate(id,
                {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    psw: psw ? psw : userById.psw,
                    phone: phone
                }, (err, result) => {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.send({
                            status: "user updated",
                            result,
                        });
                    };
                });
        } catch (error) {
            next(error)
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            await User.findOneAndDelete({ _id: id })
            return res.send({
                status: "success"
            })
        } catch (error) {
            next(error)
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const { id } = req.params;
            User.findById(id, (err, user) => {
                if (err) {
                    res.send({ err })
                } else {
                    res.send({ user })
                }
            })

        } catch (error) {
            next(error)
        }
    },

}