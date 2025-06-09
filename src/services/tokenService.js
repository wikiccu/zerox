const jwt = require('jsonwebtoken');

class TokenService {
    static generateToken(userId, phone) {
        return jwt.sign(
            { userId, phone },
            process.env.JWT_SECRET
        );
    }

    static verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return null;
        }
    }
}

module.exports = TokenService; 