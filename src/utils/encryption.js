const CryptoJS = require('crypto-js');
const bcrypt = require('bcryptjs');

class Encryption {
    static encrypt(text) {
        if (!text) return null;
        return CryptoJS.AES.encrypt(text, process.env.ENCRYPTION_KEY).toString();
    }

    static decrypt(ciphertext) {
        if (!ciphertext) return null;
        const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.ENCRYPTION_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    static async hash(text) {
        if (!text) return null;
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(text, salt);
    }

    static async compareHash(text, hash) {
        if (!text || !hash) return false;
        return bcrypt.compare(text, hash);
    }

    static encryptLocation(location) {
        if (!location) return null;
        return {
            lat: this.encrypt(location.lat.toString()),
            lng: this.encrypt(location.lng.toString())
        };
    }

    static decryptLocation(encryptedLocation) {
        if (!encryptedLocation) return null;
        return {
            lat: parseFloat(this.decrypt(encryptedLocation.lat)),
            lng: parseFloat(this.decrypt(encryptedLocation.lng))
        };
    }
}

module.exports = Encryption; 