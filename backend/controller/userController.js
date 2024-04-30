import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { fname, lname, email, password, userInterest, userAddress } = req.body;
  if (!fname || !email || !password) {
    return res.status(400).send("Fill all the inputs");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    console.log("User already exists");
    return res.status(400).send("User already exists");
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

    createToken(res, newUser._id);

    await newUser.save();

    return res.status(201).send({ _id: newUser.id });
  } catch (e) {
    console.error(e);
    return res.status(400).send("Invalid user data");
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordValid) {
      createToken(res, existingUser._id);
      res.send(existingUser.email);
    }
    return;
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', "", { httpOnly: true, expires: new Date(0) });
  res.sendStatus(200)
});
export { createUser, loginUser, logoutUser };
