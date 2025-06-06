const mongoose = require('mongoose');
const Encryption = require('../utils/encryption');

const alertSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    triggeredAt: {
        type: Date,
        default: Date.now
    },
    location: {
        lat: String,
        lng: String
    },
    audioClipUrl: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Pre-save middleware to encrypt location
alertSchema.pre('save', function(next) {
    if (this.isModified('location')) {
        this.location = Encryption.encryptLocation(this.location);
    }
    next();
});

// Method to decrypt alert data
alertSchema.methods.decryptData = function() {
    const decrypted = this.toObject();
    decrypted.location = Encryption.decryptLocation(this.location);
    return decrypted;
};

// Static method to find nearby alerts
alertSchema.statics.findNearby = async function(lat, lng, radius) {
    const alerts = await this.find({ active: true }).populate('userId');
    return alerts.filter(alert => {
        const alertLocation = Encryption.decryptLocation(alert.location);
        const distance = this.calculateDistance(
            lat, lng,
            alertLocation.lat, alertLocation.lng
        );
        return distance <= radius;
    });
};

// Helper method to calculate distance between two points
alertSchema.statics.calculateDistance = function(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
};

// Helper method to convert degrees to radians
alertSchema.statics.toRad = function(degrees) {
    return degrees * (Math.PI/180);
};

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert; 