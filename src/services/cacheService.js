const NodeCache = require('node-cache');

// Cache with 10 minutes TTL (matching OTP expiry)
const otpCache = new NodeCache({ stdTTL: 600 });

class CacheService {
    static setOTP(phone, otp) {
        const key = `otp_${phone}`;
        return otpCache.set(key, otp);
    }

    static getOTP(phone) {
        const key = `otp_${phone}`;
        return otpCache.get(key);
    }

    static deleteOTP(phone) {
        const key = `otp_${phone}`;
        return otpCache.del(key);
    }
}

module.exports = CacheService; 