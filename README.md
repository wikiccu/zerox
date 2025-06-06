# ZERO.X

0 for human shield, X for endanger person - A safety and emergency-response platform.

## Description

ZERO.X is an open-source safety and emergency-response platform that allows users to register and trigger emergency alerts. The system prioritizes user privacy and security by encrypting all sensitive data.

## Tech Stack

- Node.js with Express.js
- MongoDB with Mongoose ODM
- AES encryption for sensitive data
- SHA-256 + bcrypt for password hashing
- Security middleware (helmet, cors, rate limiting)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/zero.x.git
cd zero.x
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/zerox
ENCRYPTION_KEY=your-secure-encryption-key
```

4. Start the server:
```bash
npm run dev
```

## API Documentation

### User Endpoints

#### Register User
```http
POST /users/register
Content-Type: application/json

{
    "phone": "+1234567890",
    "name": "John Doe",
    "emergencyContacts": ["+1987654321"],
    "location": {
        "lat": 40.7128,
        "lng": -74.0060
    },
    "secretPhrase": "your-secret-phrase"
}
```

#### Verify Secret Phrase
```http
POST /users/verify
Content-Type: application/json

{
    "phone": "+1234567890",
    "secretPhrase": "your-secret-phrase"
}
```

### Alert Endpoints

#### Trigger Alert
```http
POST /alerts/trigger
Content-Type: application/json

{
    "userId": "user_id",
    "location": {
        "lat": 40.7128,
        "lng": -74.0060
    },
    "secretPhrase": "your-secret-phrase"
}
```

#### Get Nearby Alerts
```http
GET /alerts/nearby?lat=40.7128&lng=-74.0060&radius=5
```

#### Get Alert by ID
```http
GET /alerts/:id
```

## Security Features

- All sensitive data (phone numbers, names, locations) is encrypted using AES encryption
- Secret phrases are hashed using bcrypt
- Rate limiting to prevent abuse
- CORS and Helmet for additional security
- No sensitive data is logged in production

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors who will help make this project better
- Inspired by the need for better emergency response systems 