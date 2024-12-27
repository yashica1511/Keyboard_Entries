const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async(req,res) => {
    const {username,email,password} = req.body;
    try{
        if (!username || !email || !password) {
            return res.status(400).json({ msg: 'All fields are required' });
        }
        const userExists = await User.findOne({ $or: [{username}, {email}] });
        if (userExists){
            return res.status(400).json({msg: "Username or email already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            msg: 'Registered successfully',
            token, 
        });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Server error' });
    }
};

exports.loginUser = async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            msg: 'Login successful',
            token,  
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.logoutUser = async (req, res) => {
    try {
        res.status(200).json({ msg: "Logged out successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};
