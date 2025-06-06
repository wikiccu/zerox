const Alert = require('../models/Alert');
const User = require('../models/User');

exports.triggerAlert = async (req, res) => {
    try {
        const { userId, location, secretPhrase } = req.body;

        // Verify user and secret phrase
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isValid = await user.verifySecretPhrase(secretPhrase);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid secret phrase' });
        }

        // Create new alert
        const alert = new Alert({
            userId,
            location
        });

        await alert.save();

        // Return alert data
        const decryptedAlert = alert.decryptData();
        res.status(201).json({
            message: 'Alert triggered successfully',
            alert: {
                id: alert._id,
                location: decryptedAlert.location,
                triggeredAt: alert.triggeredAt
            }
        });
    } catch (error) {
        console.error('Alert trigger error:', error);
        res.status(500).json({ message: 'Error triggering alert' });
    }
};

exports.getNearbyAlerts = async (req, res) => {
    try {
        const { lat, lng, radius } = req.query;
        
        if (!lat || !lng || !radius) {
            return res.status(400).json({ 
                message: 'Missing required parameters: lat, lng, radius' 
            });
        }

        const alerts = await Alert.findNearby(
            parseFloat(lat),
            parseFloat(lng),
            parseFloat(radius)
        );

        // Decrypt alert data
        const decryptedAlerts = alerts.map(alert => {
            const decrypted = alert.decryptData();
            return {
                id: alert._id,
                location: decrypted.location,
                triggeredAt: alert.triggeredAt,
                active: alert.active
            };
        });

        res.json({ alerts: decryptedAlerts });
    } catch (error) {
        console.error('Get nearby alerts error:', error);
        res.status(500).json({ message: 'Error retrieving nearby alerts' });
    }
};

exports.getAlertById = async (req, res) => {
    try {
        const { id } = req.params;
        const alert = await Alert.findById(id).populate('userId');

        if (!alert) {
            return res.status(404).json({ message: 'Alert not found' });
        }

        // Decrypt alert data
        const decryptedAlert = alert.decryptData();
        res.json({
            alert: {
                id: alert._id,
                location: decryptedAlert.location,
                triggeredAt: alert.triggeredAt,
                active: alert.active,
                audioClipUrl: alert.audioClipUrl
            }
        });
    } catch (error) {
        console.error('Get alert error:', error);
        res.status(500).json({ message: 'Error retrieving alert' });
    }
}; 