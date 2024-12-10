const User = require('../models/usermodel')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken')


const signUp = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "passwords doesn't match" })
        }
        const user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({ error: "User already exist" })
        }
        const hashPassword = await bcrypt.hash(password, 10)

        const boyProfilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilepic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newuser = new User({
            fullName,
            username,
            password: hashPassword,
            gender,
            profilePic: gender === "male" ? boyProfilepic : girlProfilepic
        })

        if (newuser) {
            generateToken(newuser._id, res)
        }
        await newuser.save()

        res.status(200).json({
            _id: newuser._id,
            fullName: newuser.fullName,
            username: newuser.username,
            profilePic: newuser.profilePic
        })

    } catch (error) {
        return res.status(500).json({ error: "Internal SignUp error" })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ error: "username not found" })
        }

        const ispassword = await bcrypt.compare(password, user.password)
        if (!ispassword) {
            return res.status(400).json({ message: "Password doen't match" })
        }
        const token = await generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
            token
        })

    } catch (error) {
        return res.status(500).json({ error: "Internal Login error" })
    } 
}
const logout = (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0}) 
        res.status(200).json({message:"Logout Successfully"})
    } catch (error) {
        return res.status(500).json({error:"Internal logout error"})
    }
}
module.exports = { signUp, login, logout }