const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Public routes
router.post('/request-otp', UserController.requestOTP);
router.post('/verify-otp', UserController.verifyOTP);

// Protected routes
router.get('/profile', auth, UserController.getProfile);
router.put('/trusted-contacts', auth, UserController.updateTrustedContacts);

module.exports = router; 