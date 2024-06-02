import { Request, Response } from "express";
import { User } from "../models/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authController = {
  createUser: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password before saving the user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user with the hashed password
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      return res.status(201).json(savedUser);
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  },

  loginUser: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user || !user.password) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "1h",
      });

      return res
        .status(200)
        .json({ user: payload, token, message: "Login success" });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  },
};
