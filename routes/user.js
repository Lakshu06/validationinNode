var express = require('express');
var router = express.Router();
var { User, validate } = require('../models/user')

router.post("/signUp", async (req, res) => {
    let newUser = new User({ name: req.body.name, password: req.body.password, confirm_password: req.body.confirm_password });
    const error = validate(req.body);
    if (error.error != null) {
        console.log(error.error)
        return res.status(400).json({
            status: 'error',
            message: 'Invalid request data',
            data: newUser
        });
    }
    else {
        newUser = await newUser.save();
        res.status(200).json({
            status: 'success',
            message: 'user created successfully',
            data: newUser
        });
    }
});

router.post("/login", async (req, res) => {
    var newUser = {};
    newUser.name = req.body.name;
    newUser.password = req.body.password;

    await User.findOne({ name: newUser.name })
        .then(profile => {
            if (!profile) {
                res.status(400).json({ message: "User not exist" });
            } else {
                res.status(200).json({
                    success: true,
                    message: "Login successful",
                    data: newUser
                })
            }

        })
        .catch(err => {
            console.log("Error is ", err.message);
        });
});

module.exports = router;