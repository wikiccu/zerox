# ZERO.X

0 for human shield, X for endanger person - A safety and emergency-response platform.

## Description

ZERO.X is an open-source safety and emergency-response platform that allows users to register and trigger emergency alerts. The system prioritizes user privacy and security by encrypting all sensitive data.

## Features

- **Secure User Authentication**
  - Phone number-based registration
  - OTP verification
  - JWT-based authentication
  - Encrypted sensitive data storage

- **Trusted Contacts Management**
  - Add and manage trusted contacts
  - Maximum 10 trusted contacts per user
  - Secure storage of contact information
  
## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Security**: 
  - Data encryption using CryptoJS
  - Rate limiting
  - Helmet for security headers
  - CORS protection

## API Endpoints

### Authentication

#### Request OTP
```bash
POST /users/request-otp
Content-Type: application/json

{
  "phone": "09123456789"
}
```

#### Verify OTP
```bash
POST /users/verify-otp
Content-Type: application/json

{
  "phone": "09123456789",
  "otp": "123456"
}
```

### User Management

#### Get Profile

```bash
GET /users/profile
Authorization: Bearer <jwt_token>
```

#### Update Trusted Contacts

```bash
PUT /users/trusted-contacts
Authorization: Bearer <jwt_token>
Content-Type: application/json

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
JWT_SECRET=your-jwt-key
ENCRYPTION_KEY=yourencryption-key
```

4. Start the development server:
```bash
npm run dev
```

## Development

- `npm run dev`: Start development server with nodemon
- `npm start`: Start production server
- `npm test`: Run tests

## Security Features

- All sensitive data (phone numbers, trusted contacts) is encrypted before storage
- JWT tokens for secure authentication
- Rate limiting to prevent abuse
- Input validation for phone numbers
- Secure headers with Helmet
- CORS protection

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
