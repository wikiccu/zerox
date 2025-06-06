const mongoose = require('mongoose');
const Encryption = require('../utils/encryption');

const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    emergencyContacts: [{
        type: String
    }],
    location: {
        lat: String,
        lng: String
    },
    secretPhrase: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Pre-save middleware to encrypt sensitive data
userSchema.pre('save', async function(next) {
    if (this.isModified('phone')) {
        this.phone = Encryption.encrypt(this.phone);
    }
    if (this.isModified('name')) {
        this.name = Encryption.encrypt(this.name);
    }
    if (this.isModified('emergencyContacts')) {
        this.emergencyContacts = this.emergencyContacts.map(contact => 
            Encryption.encrypt(contact)
        );
    }
    if (this.isModified('location')) {
        this.location = Encryption.encryptLocation(this.location);
    }
    if (this.isModified('secretPhrase')) {
        this.secretPhrase = await Encryption.hash(this.secretPhrase);
    }
    next();
});

// Method to decrypt user data
userSchema.methods.decryptData = function() {
    const decrypted = this.toObject();
    decrypted.phone = Encryption.decrypt(this.phone);
    decrypted.name = Encryption.decrypt(this.name);
    decrypted.emergencyContacts = this.emergencyContacts.map(contact => 
        Encryption.decrypt(contact)
    );
    decrypted.location = Encryption.decryptLocation(this.location);
    return decrypted;
};

// Method to verify secret phrase
userSchema.methods.verifySecretPhrase = async function(phrase) {
    return await Encryption.compareHash(phrase, this.secretPhrase);
};

const User = mongoose.model('User', userSchema);

module.exports = User; 