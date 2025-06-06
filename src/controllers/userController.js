const User = require('../models/User');
const Encryption = require('../utils/encryption');

exports.register = async (req, res) => {
    try {
        const { phone, name, emergencyContacts, location, secretPhrase } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = new User({
            phone,
            name,
            emergencyContacts,
            location,
            secretPhrase
        });

        await user.save();

        // Return decrypted data for confirmation
        const decryptedUser = user.decryptData();
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                phone: decryptedUser.phone,
                name: decryptedUser.name,
                emergencyContacts: decryptedUser.emergencyContacts,
                location: decryptedUser.location
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
};

exports.verifySecretPhrase = async (req, res) => {
    try {
        const { phone, secretPhrase } = req.body;
        
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isValid = await user.verifySecretPhrase(secretPhrase);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid secret phrase' });
        }

        res.json({ message: 'Secret phrase verified successfully' });
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ message: 'Error verifying secret phrase' });
    }
}; 