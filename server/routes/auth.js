const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async(req, res) => {
    try {
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            res.status(404).send("User already exists")
            return
        }
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //create new user
        const newUser = new User({
            username: req.body.username.trim(),
            email: req.body.email.toLowerCase().trim(),
            password: hashedPassword,
            phone: req.body.phone.trim(),
        });
        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//LOGIN
router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).send("User not found")
            return
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        !validPassword && res.status(400).json("wrong password");
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.post("/update/:userId", async(req, res) => {
    try {
        let currentUser = await User.findById({ _id: req.params.userId });
        const userExist = await User.findOne({ email: req.body.email.toLowerCase() });

        if (userExist && req.body.email.toLowerCase() != currentUser.email) {
            res.status(404).send("User already exists")
            return
        }


        //update user details
        let updateUser = await User.findByIdAndUpdate({ _id: req.params.userId }, { $set: req.body });
        updateUser.save();
        updateUser = await User.findOne({ _id: req.params.userId });
        console.log(updateUser)
        res.status(200).json(updateUser);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;