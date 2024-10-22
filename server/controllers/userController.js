const User = require('../models/userModels');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ name, email, password });
        res.status(201).json({ message: 'User registered successfully', user });

    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful', user });

    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find(); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        const updatedUser = await User.updateOne({ _id: id }, { name, email });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.deleteOne({ _id: id });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    updateUser,
    deleteUser
};
