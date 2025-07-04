const userSchema = require("../model/userModel");
const bcrypt = require("bcrypt");

const userRegistration = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await userSchema.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userSchema.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({message:"Invalid email or password"});
    }

    res.status(200).json({ 
      message: "Login successful", 
      userId: existingUser._id  //  Add this line
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {userRegistration, userLogin};