const userModel = require('../model/dbUtils.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const SECRET = process.env.JWT_SECRET || 'your-secret-key';
exports.AuthtestConnection = (req, res) => {
    res.status(200).json({ message: 'AuthtestConnection Connection successful' });
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const user = await userModel.getByEmail('users', email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            SECRET,
            { expiresIn: '10h' }
        );
        res.status(200).json({ success: true, token });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
};

exports.register = async (req, res) => {
    try {       
        const { firstName, email, password } = req.body;       
        if (!email || !password || !firstName) {
            return res.status(400).json({ error: 'Email, password and firstName are required' });
        }
        const existingUser = await userModel.getByEmail('users', email);
        if (existingUser) {
            return res.status(409).json({ error: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            email,
            password: hashedPassword,
            firstName
        };
        const userId = await userModel.create('users', newUser);
        const token = jwt.sign(
            { userId, email },
            SECRET,
            { expiresIn: '10h' }
        );  
        res.status(201).json({ success: true, message: 'User registered successfully', token });
    }
    catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
}