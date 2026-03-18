import Resume from "../models/Resume.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return token;
};

// User registration
// POST: /api/users/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Missing required fields",
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exist",
            });
        }

        const newUser = await User.create({
            name,
            email,
            password,
        });

        const token = generateToken(newUser._id);
        newUser.password = undefined;

        return res.status(201).json({
            message: "User created successfully",
            token,
            user: newUser,
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

// User login
// post: /api/users/login

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        const token = generateToken(user._id);
        user.password = undefined;

        return res.status(200).json({
            message: "Login successful",
            token,
            user,
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

// controller for getting user by id
// get: /api/users/data

export const getUserId = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        return res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
        });
    }
};

// controller for getting user resumes
// get: /api/users/resumes

export const getUserResumes = async (req, res) => {
    try {
        const userId = req.userId;
        const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });
        return res.status(200).json({ resumes });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};
