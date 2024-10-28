import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Route for user login
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // checking if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid email, please sign up" })
        }

        // check if user is guest
        if (user.isGuest) {
            return res.json({ success: false, message: "Invalid password, please sign up" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {

            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
            res.json({ success: true, token });

        } else {
            res.json({ success: false, message: "Invalid password" })
        }

    } catch (error) {

    }

}

// Route for user register
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // checking if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            if (!exists.isGuest) {
                return res.json({ success: false, message: "User already exists" })
            }
        }

        // validating email format & password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must contain at least 8 characters" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // funcitonality to overwrite guest account if user creates permanent account
        if (exists) {
            const updateData = {
                name,
                email,
                password: hashedPassword,
                isGuest: false,
            }

            await userModel.findByIdAndUpdate(exists._id, updateData, { new: true });

            const token = jwt.sign({ id: exists._id, role: exists.role }, process.env.JWT_SECRET);

            return res.json({ success: true, token });
        }

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Function for creating temporary guest account
const createGuest = async (req, res) => {
    try {

        const { name, email } = req.body;

        // checking if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            if (!exists.isGuest) {
                return res.json({ success: false, message: "User already exists, please login" })
            }
        }

        const tempUser = new userModel({
            name,
            email,
            isGuest: true
        });

        const guestUser = await tempUser.save()

        const tempToken = jwt.sign({ id: guestUser._id }, process.env.JWT_SECRET, { expiresIn: '12h' });

        setTimeout(async () => { 
            if (guestUser.isGuest) {
                await userModel.deleteOne({ _id: guestUser._id });
            }
         }, 12 * 60 * 60 * 1000); // Deletes user after 12 hours

        res.json({ success: true, tempToken })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const adminLogin = async (req, res) => {
    try {

        const { email, password } = req.body;

        // checking if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid email" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {

            if (user.role === 'admin') {
                const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
                res.json({ success: true, token });
            } else {
                res.json({ success: false, message: "User does not have admin privileges" })
            }

        } else {
            res.json({ success: false, message: "Invalid password" })
        }

    } catch (error) {

    }
}

// function for listing users
const listUsers = async (req, res) => {

    try {

        const users = await userModel.find({});
        res.json({ success: true, users })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

// function for removing users
const removeUser = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "User Removed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { loginUser, registerUser, adminLogin, listUsers, removeUser, createGuest }