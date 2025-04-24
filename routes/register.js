// routes/register.mjs

import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../DB-utilis/models.js';

const registerRouter = express.Router();

registerRouter.post('/', async (req, res) => {
  try {
    const { name, phone, email, address, userType, gstNo, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = Date.now().toString();

    const newUser = new User({
      name,
      userId,
      phone,
      email,
      address,
      userType,
      gstNo,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).send({msg: 'User registered successfully'});
  } catch (error) {
    res.status(400).send({ msg: "Invalid Credentials", error});
  }
});

export default registerRouter;
