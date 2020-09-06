const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const { options } = require("../routes/users");
module.exports = {

    addUsers: async (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*")
        try {
            const { firstName, lastName, email, psw, phone } = req.body;
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
                return res.status(422).send({
                    status: "error",
                    errors,
                });
            };
            const user = await User.create({ firstName, lastName, email, psw, phone });
            res.send({
                status: "done",
                user
            });

        } catch (error) {
            next(error)
        }
    },

    login: async (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*")
        try {
            const { email, psw } = req.body
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
            };
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
            const { id } = req.params;
            const { firstName, lastName, email, psw, phone } = req.body;
            const errors = {};
            if (!firstName) {
                errors.firstName = "First name is required";
            };
            if (!lastName) {
                errors.lastName = "Last name is required";
            };
            if (!email) {
                errors.email = "Email is required";
            };
            if (!phone) {
                errors.phone = "Phone is required";
            };
            if (!psw) {
                errors.psw = "Password is required";
            };
            if (Object.keys(errors).length) {
                return res.status(422).send({
                    status: "error",
                    errors,
                });
            };
            User.findByIdAndUpdate(id,
                {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    psw: psw,
                    phone: phone
                }, (err, result) => {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.send({
                            status: "user updated"
                        });
                    };
                });
        } catch (error) {
            next(error)
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params
            await User.findOneAndDelete({ _id: id })
            return res.status(200).json({ success: true })
        } catch (error) {
            next(error)
        }
    },
}