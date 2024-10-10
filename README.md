# Password Reset Functionality with React and Node.js

## Overview

This project implements a password reset functionality using React for the frontend and Node.js with Express for the backend. Users can request a password reset via email, which contains a link with a unique token. Upon clicking the link, they can reset their password securely. The project utilizes MongoDB for data storage, Nodemailer for sending emails, and bcrypt for password hashing.

## Features

- User can request a password reset.
- Unique reset token is sent to the user's email.
- User can reset their password by clicking the link in the email.
- Passwords are hashed using bcrypt before storing in the database.
- Responsive frontend built with React and Bootstrap.

## Technologies Used

- **Frontend:** React, Bootstrap
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Email Service:** Nodemailer
- **Authentication:** JSON Web Tokens (JWT), bcrypt

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or hosted instance)
- npm (Node package manager)
- A Gmail account (for Nodemailer)

### Step-by-Step Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/password-reset-app.git
   cd password-reset-app
2.**Backend Setup:**
```cd backend
```
**Install dependencies:**
```npm install
```

**Create a .env file in the backend directory and add the following:**
```EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
FRONTEND_URL=http://localhost:3000```

**Start the backend server:**
```npm start
```

3.**Frontend Setup:**

**Navigate to the frontend directory:**
```cd frontend
```

**Install dependencies:**
```npm install
```

**Start the frontend server:**
```npm start
```

**API Endpoints**

**POST /api/auth/forgot-password**
**Description:** Sends a password reset email to the user.
**Request Body:**
**email (string):** The email address of the user requesting the reset.
**Response:**
200 OK: Email sent successfully.
404 Not Found: User not found.


**POST /api/auth/reset-password/**
**Description:** Resets the user's password.
**Request Parameters:**
**token (string):** The unique token sent to the user's email.
**Request Body:
**password (string):** The new password.
**Response:**
200 OK: Password reset successfully.
400 Bad Request: Invalid or expired token.
