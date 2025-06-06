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
git clone https://github.com/wikiccu/zerox.git
cd zerox
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

## Acknowledgments

- Thanks to all contributors who will help make this project better
- Inspired by the need for better emergency response systems 