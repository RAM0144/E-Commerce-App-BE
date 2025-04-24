// routes/login.mjs

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { User } from '../DB-utilis/models.js';

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ msg: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send({ msg: "Invalid Credentials" });
    }

    const userObj = user.toObject();

    delete userObj.password;

    const authToken = jwt.sign(userObj, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRY_TIME })

    res.send({ msg: "Login successful", userToken: authToken });
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error", error});
  }
});

export default loginRouter;


