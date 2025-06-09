const User = require('../models/user');
const TokenService = require('../services/tokenService');
const CacheService = require('../services/cacheService');

class UserController {
    static async requestOTP(req, res) {
        try {
            const { phone } = req.body;
            
            if (!phone) {
                return res.status(400).json({ error: 'Phone number is required' });
            }

            // Generate and store OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            CacheService.setOTP(phone, otp);

            // In production, send OTP via SMS service
            console.log(`OTP for ${phone}: ${otp}`);

            res.json({ message: 'OTP sent successfully' });
        } catch (error) {
            console.error('Error in requestOTP:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async verifyOTP(req, res) {
        try {
            const { phone, otp } = req.body;

            if (!phone || !otp) {
                return res.status(400).json({ error: 'Phone and OTP are required' });
            }

            const storedOTP = CacheService.getOTP(phone);
            if (!storedOTP || storedOTP !== otp) {
                return res.status(400).json({ error: 'Invalid OTP' });
            }

            // Find or create user
            let user = await User.findOne({ phone });
            if (!user) {
                user = await User.create({ phone });
            }

            // Generate token
            const token = TokenService.generateToken(user._id, phone);

            // Clear OTP from cache
            CacheService.deleteOTP(phone);

            res.json({
                message: 'OTP verified successfully',
                token,
                user: {
                    id: user._id,
                    phone: user.phone
                }
            });
        } catch (error) {
            console.error('Error in verifyOTP:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getProfile(req, res) {
        try {
            const user = await User.findById(req.user.userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({
                id: user._id,
                phone: user.phone,
                trustedContacts: user.trustedContacts
            });
        } catch (error) {
            console.error('Error in getProfile:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async updateTrustedContacts(req, res) {
        try {
            const { trustedContacts } = req.body;
            const user = await User.findById(req.user.userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            user.trustedContacts = trustedContacts;
            await user.save();

            res.json({
                message: 'Trusted contacts updated successfully',
                trustedContacts: user.trustedContacts
            });
        } catch (error) {
            console.error('Error in updateTrustedContacts:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = UserController; 