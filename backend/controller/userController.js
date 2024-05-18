import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

// Create a new user
const createUser = asyncHandler(async (req, res) => {
  const { fname, lname, email, password, userInterest, userAddress } = req.body;
  if (!fname || !email || !password) {
    return res.status(400).json({ message: "Fill all the inputs" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    console.log("User already exists");
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fname,
      lname,
      email,
      password: hashedPassword,
      userInterest,
      userAddress,
    });

    await newUser.save();
    createToken(res, newUser._id);

    return res.status(201).json({ _id: newUser.id });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: "Invalid user data" });
  }
});

// Login a user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (isPasswordValid) {
      createToken(res, existingUser._id);
      return res.json({ email: existingUser.email,fname: existingUser.fname,lname: existingUser.lname,userAddress: existingUser.userAddress,userInterest: existingUser.userInterest});
    }
  }
  return res.status(401).json({ message: "Invalid email or password" });
});

// Logout a user
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', "", { httpOnly: true, expires: new Date(0) });
  return res.sendStatus(200);
});

// Get current user's profile
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    return res.json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      userInterest: user.userInterest,
      userAddress: user.userAddress,
    });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

// Update current user profile
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.email = req.body.email || user.email;
    user.fname = req.body.fname || user.fname;
    user.lname = req.body.lname || user.lname;
    user.userInterest = req.body.userInterest || user.userInterest;
    user.userAddress = req.body.userAddress || user.userAddress;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }
    
    const updatedUser = await user.save();

    return res.json({
      _id: updatedUser._id,
      fname: updatedUser.fname,
      lname: updatedUser.lname,
      email: updatedUser.email,
      userInterest: updatedUser.userInterest,
      userAddress: updatedUser.userAddress,
    });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

export { createUser, loginUser, logoutUser, getCurrentUserProfile, updateCurrentUserProfile };
