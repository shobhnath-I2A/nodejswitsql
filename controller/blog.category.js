const userModel = require('../model/dbUtils');
const bcrypt = require('bcrypt');
require('dotenv').config();
const LIMIT = parseInt(process.env.LIMIT) || 10;
exports.testBlogConnection = (req, res) => {
    res.status(200).json({ message: 'Connection successful' });
};

exports.createUser = async (req, res) => {
    try {
        const formData = req.body;
        if (!formData.firstName || !formData.email || !formData.password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const existingUser = await userModel.getByEmail('users', formData?.email);       
        if (existingUser) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        const existingMobile = await userModel.getByPhone('users', formData?.mobile);       
        if (existingMobile) {
            return res.status(409).json({ error: 'Mobile already exists' });
        }

        const hashedPassword = await bcrypt.hash(formData?.password, 10);
        const userData = {
            firstName: formData?.firstName??"",
            lastName: formData?.lastName??"",
            email: formData?.email,
            mobile: formData?.mobile || null,
            email_verified_at: '0',
            utype: formData?.utype || 'USR',
            password: hashedPassword,
            created_at: new Date(),
            updated_at: new Date()
        };         
        const result = await userModel.create('users',userData);
        return res.status(201).json({ success: true, message: 'User created successfully', userId: result });
    } catch (err) {
        return res.status(500).json({ success:false, message: 'Error creating user', error: err.message });
    }
};