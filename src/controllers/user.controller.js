import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'

const TOKEN_KEY = process.env.TOKEN_KEY;

const registerUser = async (req, res) => {
  try {
    const { phone_number, priority } = req.body;

    const existingUser = await User.findOne({ phone_number });
    if (existingUser) {
      return res.status(400).json({ error: "Phone number already registered" });
    }

    const newUser = new User({ phone_number, priority, tasks: [] });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, TOKEN_KEY, {
      expiresIn: "1d",
    });

    res.json({ token, user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser=async (req, res) => {
  try {
    const { phone_number } = req.body;

    const user = await User.findOne({ phone_number });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid phone number or password" });
    }

    const token = jwt.sign({ userId: user._id }, TOKEN_KEY, {
      expiresIn: "5h",
    });

    res.json({ token, user });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { registerUser, loginUser};
