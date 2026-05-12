# Quantity Measurement App - Node.js

A Node.js backend application for performing quantity measurement operations such as conversion, comparison, arithmetic operations, and history tracking.

## Features

- User authentication using JWT
- Quantity conversion
- Quantity comparison
- Arithmetic operations on quantities
- Operation history storage
- MySQL database integration
- REST API using Express.js

## Technologies Used

- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcrypt
- dotenv
- CORS
- Nodemon

## Project Structure

```bash
Quantity-Measurement-App/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   └── quantityController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── userModel.js
│   └── quantityModel.js
│
├── routes/
│   ├── authRoutes.js
│   └── quantityRoutes.js
│
├── .env
├── app.js
├── package.json
└── README.md
