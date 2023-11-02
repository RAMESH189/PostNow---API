const User = require("../models/users");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password) {
      res.status(400).json("Please Enter your login credentials");
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json("User not found");
    }
    const isPasswordCorrect = await user.checkPassword(password);
    if (!isPasswordCorrect) {
      res.status(400).json("The password that you entered is incorrect");
    }
    res.status(200).json({ msg: `welcome ${username}` });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "something went wrong, please try again later" });
  }
};

module.exports = {
  login,
  register,
};
