const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register a new user
router.post('/register', userController.register);

// Verify user's secret phrase
router.post('/verify', userController.verifySecretPhrase);

module.exports = router; 