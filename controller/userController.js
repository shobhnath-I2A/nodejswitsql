const userModel = require('../model/dbUtils');
const bcrypt = require('bcrypt');
require('dotenv').config();
const LIMIT = parseInt(process.env.LIMIT) || 10;
exports.testConnection = (req, res) => {
    res.status(200).json({ message: 'Connection successful' });
};

exports.getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || LIMIT;
        const offset = (page - 1) * limit;
        const results = await userModel.getAll('users',limit, offset);
        const users = results.map(user => ({
            id: user?.id,
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            mobile: user?.mobile,
            utype: user?.utype,
            created_at: user?.created_at,
            updated_at: user?.updated_at
        }));

        return res.status(200).json({ success: true, message: 'Users retrieved successfully', users });
    } catch (err) {
        return res.status(500).json({ success:false, message: 'Error retrieving users', error: err.message });
    }
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
exports.updateUser = async (req, res) => {
    try {
        const formData = req?.body;
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        console.log('formData', formData);
        if (!formData?.firstName || !formData?.email) {
            return res.status(400).json({ error: 'All fields are required' });
        }  
        const userData = {
            firstName: formData?.firstName,
            email: formData?.email,
            mobile: formData?.mobile || null,
            email_verified_at: '0',
            utype: formData?.utype || 'USR',
            updated_at: new Date()
        };
        await userModel.update('users', userId, userData);
        return res.status(200).json({ success: true, message: 'User created successfully' });
    } catch (err) {
        return res.status(500).json({ success:false, message: 'Error creating user', error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const result = await userModel.remove('users', userId);
        if (result === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
        return res.status(500).json({ success:false, message: 'Error deleting user', error: err.message });
    }
}
exports.deleteUsersBulk = async (req, res) => {
    try {
        const ids = req?.body?.ids;       
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ error: 'Array of user IDs is required' });
        }
        const result = await userModel.deleteBulk('users', ids);
        return res.status(200).json({ success: true, message: `Deleted ${result} user(s)` });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Error deleting users', error: err.message });
    }
};
exports.getUserById = async (req, res) =>{
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const user = await userModel.getById('users', userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({ success: true, message: 'User retrieved successfully', user });
    } catch (err) {
        return res.status(500).json({ success:false, message: 'Error retrieving user', error: err.message });
    }
}
exports.getUserCount = async (req, res) => {
    try {
        const count = await userModel.count('users');
        return res.status(200).json({ success: true, message: 'User count retrieved successfully', count });
    } catch (err) {
        return res.status(500).json({ success:false, message: 'Error retrieving user count', error: err.message });
    }
};