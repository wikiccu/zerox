const mongoose = require('mongoose');
const Encryption = require('../utils/encryption');

const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    trustedContacts: [{
        type: String
    }]
}, {
    timestamps: true
});

// Pre-save middleware to encrypt sensitive data
userSchema.pre('save', async function(next) {
    try {
        if (this.isModified('phone')) {
            this.phone = Encryption.encrypt(this.phone);
        }
        if (this.isModified('trustedContacts')) {
            this.trustedContacts = this.trustedContacts.map(contact => 
                Encryption.encrypt(contact)
            );
        }
        next();
    } catch (error) {
        next(error);
    }
});

// Method to decrypt user data
userSchema.methods.decryptData = function() {
    const decrypted = this.toObject();
    decrypted.phone = Encryption.decrypt(this.phone);
    decrypted.trustedContacts = this.trustedContacts.map(contact => 
        Encryption.decrypt(contact)
    );
    return decrypted;
};

// Method to validate trusted contacts count
userSchema.methods.canAddTrustedContact = function() {
    return this.trustedContacts.length < 10;
};

const User = mongoose.model('User', userSchema);

module.exports = User; 