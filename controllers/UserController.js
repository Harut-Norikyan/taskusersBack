const User = require("../models/Users");

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
            }
            const user = await User.create({firstName, lastName, email, psw, phone});
            res.send({
                "status": "done",
                user
            });
          
        } catch (error) {
            next(error)
        }
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
}