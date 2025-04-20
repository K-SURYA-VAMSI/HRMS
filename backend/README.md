# HRMS Backend API

This is the backend API for the HRMS (Human Resource Management System) application. It provides authentication, user management, and other HR-related functionalities.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd HRMS/backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/hrms
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   FRONTEND_URL=http://localhost:5173
   EMAIL_USERNAME=your-email@gmail.com
   EMAIL_PASSWORD=your-email-app-password
   ```
5. Start the development server:
   ```
   npm run dev
   ```

## API Documentation

### Authentication Endpoints

#### Register a new user
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "employee"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "token": "jwt-token",
    "user": {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "employee"
    }
  }
  ```

#### Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "token": "jwt-token",
    "user": {
      "id": "user-id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "employee"
    }
  }
  ```

#### Forgot Password
- **URL**: `/api/auth/forgot-password`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "john@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "Reset token sent to email"
  }
  ```

#### Reset Password
- **URL**: `/api/auth/reset-password`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "token": "reset-token-from-email",
    "password": "new-password"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "token": "new-jwt-token"
  }
  ```

#### Get Current User
- **URL**: `/api/auth/me`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer jwt-token`
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "user": {
        "id": "user-id",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "employee"
      }
    }
  }
  ```

### User Management Endpoints

#### Get All Users (HR only)
- **URL**: `/api/users`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer jwt-token`
- **Response**:
  ```json
  {
    "status": "success",
    "results": 2,
    "data": {
      "users": [
        {
          "id": "user-id-1",
          "name": "John Doe",
          "email": "john@example.com",
          "role": "employee"
        },
        {
          "id": "user-id-2",
          "name": "Jane HR",
          "email": "jane@example.com",
          "role": "hr"
        }
      ]
    }
  }
  ```

#### Get User by ID (HR or self)
- **URL**: `/api/users/:id`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer jwt-token`
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "user": {
        "id": "user-id",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "employee"
      }
    }
  }
  ```

#### Update User (HR or self)
- **URL**: `/api/users/:id`
- **Method**: `PATCH`
- **Headers**: `Authorization: Bearer jwt-token`
- **Body**:
  ```json
  {
    "name": "John Updated"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "user": {
        "id": "user-id",
        "name": "John Updated",
        "email": "john@example.com",
        "role": "employee"
      }
    }
  }
  ```

#### Delete User (HR only)
- **URL**: `/api/users/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer jwt-token`
- **Response**:
  ```json
  {
    "status": "success",
    "data": null
  }
  ```

## Error Handling

All API endpoints return appropriate HTTP status codes and error messages in the following format:

```json
{
  "status": "error",
  "message": "Error message description"
}
```

Common status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error 