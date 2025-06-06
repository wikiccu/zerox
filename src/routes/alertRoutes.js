const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');

// Trigger a new alert
router.post('/trigger', alertController.triggerAlert);

// Get nearby alerts
router.get('/nearby', alertController.getNearbyAlerts);

// Get specific alert by ID
router.get('/:id', alertController.getAlertById);

module.exports = router; 