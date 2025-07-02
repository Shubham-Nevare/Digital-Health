HEAD
# Health Connect Doctor

A comprehensive telemedicine platform connecting patients with healthcare professionals through video consultations, appointment booking, and medical record management.

## Features

- **User Authentication**: Secure login/registration for patients and doctors
- **Doctor Profiles**: Detailed doctor information with specialties, ratings, and availability
- **Appointment Booking**: Easy appointment scheduling with real-time availability
- **Video Consultations**: Integrated video calling for remote consultations
- **Medical Records**: Secure storage and management of patient medical history
- **Payment Integration**: Secure payment processing for consultations
- **Responsive Design**: Mobile-friendly interface for all devices

## Tech Stack

### Frontend
- **Next.js 15** - React framework
- **React 19** - UI library
- **Tailwind CSS** - Styling
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd health-connect-doctor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the server directory:
   ```env
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/health-connect-doctor
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   
   # Server Configuration
   PORT=5000
   <!-- NODE_ENV=development -->
   
   # Email Configuration (optional)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system or use MongoDB Atlas.

5. **Seed the database**
   ```bash
   npm run seed
   ```

6. **Start the development servers**

   **Terminal 1 - Frontend:**
   ```bash
   npm run dev
   ```

   **Terminal 2 - Backend:**
   ```bash
   npm run server:dev
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | User login | Public |
| GET | `/api/auth/profile` | Get user profile | Private |
| PUT | `/api/auth/profile` | Update user profile | Private |
| GET | `/api/auth/doctors` | Get all doctors | Public |
| GET | `/api/auth/doctors/:id` | Get doctor by ID | Public |

### Appointments

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/appointments` | Create appointment | Private |
| GET | `/api/appointments` | Get user appointments | Private |
| GET | `/api/appointments/:id` | Get appointment by ID | Private |
| PUT | `/api/appointments/:id/status` | Update appointment status | Doctor/Admin |
| PUT | `/api/appointments/:id/cancel` | Cancel appointment | Private |
| POST | `/api/appointments/:id/rate` | Rate appointment | Patient |
| GET | `/api/appointments/doctor/:id/schedule` | Get doctor schedule | Public |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | API health status |

## Database Models

### User Model
- Supports both patients and doctors
- Role-based fields and permissions
- Secure password hashing
- Profile information and medical history

### Appointment Model
- Patient-doctor relationship
- Appointment scheduling and status tracking
- Consultation details and payment information
- Rating and review system

### Medical Record Model
- Comprehensive medical history tracking
- File attachments support
- Privacy controls
- Follow-up scheduling

## Sample Data

Demo Credentials:
Patient: patient@gmail.com / user123
Doctor: doctor@gmail.com / user123
Admin: admin@admin.com / admin123

## Development Scripts

```bash
# Frontend development
npm run dev

# Backend development
npm run server:dev

# Production build
npm run build
npm start

# Database seeding
npm run seed

# Linting
npm run lint
```

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **Input Validation**: express-validator for data validation
- **Rate Limiting**: Protection against brute force attacks
- **CORS Configuration**: Controlled cross-origin requests
- **Helmet**: Security headers
- **Input Sanitization**: Protection against injection attacks

## Deployment

### Frontend (Vercel/Netlify)
1. Connect your repository
2. Set environment variables
3. Deploy

### Backend (Heroku/Railway)
1. Set environment variables
2. Configure MongoDB connection
3. Deploy

### Database (MongoDB Atlas)
1. Create cluster
2. Set up database user
3. Configure network access
4. Update connection string

# DigitalHealth
