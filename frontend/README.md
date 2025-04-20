# HRMS

A comprehensive HR and employee management system built with modern web technologies.

## Overview

Workwise Management System is a full-featured HR management platform that helps organizations streamline their human resources processes. The system provides separate interfaces for employees and HR personnel, with role-based access control and specialized features for each user type.

## Features

### Employee Features
- **Dashboard**: Personalized dashboard with key information and quick actions
- **Attendance System**: Track attendance, view attendance history, and request time off
- **Leave Requests**: Submit and track leave requests
- **Job Roles**: View job descriptions and career paths
- **Department Work**: Collaborate with team members and track department activities

### HR Features
- **HR Dashboard**: Comprehensive overview of HR metrics and activities
- **Employee Management**: Manage employee profiles, roles, and departments
- **Recruitment Panel**: Post jobs, manage applications, and track the hiring process
- **Leave Management**: Approve/reject leave requests and manage leave policies
- **Payroll System**: Process payroll, manage deductions, and generate reports

## Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router v6
- **Form Handling**: React Hook Form with Zod validation
- **Notifications**: Sonner toast notifications
- **Icons**: Lucide React
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd workwise-management-system
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
workwise-management-system/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ui/           # UI component library
│   │   └── ...           # Application-specific components
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and helpers
│   ├── pages/            # Page components
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── public/               # Static assets
├── index.html            # HTML template
└── package.json          # Project dependencies and scripts
```

## Development

- **Linting**: `npm run lint`
- **Building**: `npm run build`
- **Preview Build**: `npm run preview`

## Deployment

The application can be deployed to any static hosting service:

1. Build the application:
   ```sh
   npm run build
   ```

2. Deploy the contents of the `dist` directory to your hosting service.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
