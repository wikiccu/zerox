const CacheService = require('./cacheService');

class OTPService {
    static generateOTP() {
        // Generate a 6-digit OTP
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    static async generateAndSaveOTP(phone) {
        const otp = this.generateOTP();
        CacheService.setOTP(phone, otp);
        return otp;
    }

    static async verifyOTP(phone, otp) {
        const storedOTP = CacheService.getOTP(phone);
        
        if (!storedOTP) {
            return false;
        }

        if (storedOTP !== otp) {
            return false;
        }

        // Clear OTP after successful verification
        CacheService.deleteOTP(phone);
        return true;
    }
}

module.exports = OTPService; 