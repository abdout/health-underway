# Healthcare Appointment Management System - Riche

A comprehensive healthcare platform built with **Next.js 15**, **Prisma**, **PostgreSQL**, and **TypeScript** that streamlines patient registration, appointment scheduling, and medical records management. This system supports real-time appointment management with automated email notifications.

![Healthcare Platform](https://img.shields.io/badge/Status-Development-yellow)
![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.9.0-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791)

---

## 🏥 System Overview

The **Riche Healthcare Platform** is designed to revolutionize healthcare appointment management with a modern, user-friendly interface. It supports multi-role systems (USER/ADMIN), real-time appointment tracking, and automated notifications.

### 🌟 Key Features

- **🔐 Multi-role Authentication**: Secure USER and ADMIN role management with NextAuth.js
- **📋 Patient Registration**: Comprehensive patient onboarding with medical history
- **📅 Appointment Scheduling**: Real-time appointment booking with doctor selection
- **🏥 Admin Dashboard**: Complete appointment management with status tracking
- **📧 Email Notifications**: Automated confirmations and cancellation notifications
- **📊 Status Management**: Three-state appointment lifecycle (pending, scheduled, cancelled)
- **🏥 Doctor Management**: Pre-configured physician selection system
- **📱 Responsive Design**: Mobile-first design with shadcn/ui components
- **🔍 Advanced Search**: Real-time appointment filtering and search

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.3.3 with App Router
- **Language**: TypeScript 5.8.3
- **Styling**: Tailwind CSS 4.1.8
- **UI Components**: shadcn/ui with Radix UI primitives
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Context + Server Actions
- **Date Handling**: React DatePicker
- **Icons**: Lucide React + React Icons

### Backend
- **Runtime**: Node.js with Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5 (beta)
- **Email Service**: Resend API
- **File Upload**: Cloudinary integration
- **Validation**: Zod schema validation

### Development Tools
- **Package Manager**: pnpm (recommended)
- **Linting**: ESLint with Next.js config
- **Type Safety**: TypeScript strict mode
- **Database Management**: Prisma Studio

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.x or higher
- **pnpm** 8.x or higher (recommended)
- **PostgreSQL** database
- **Resend** account for email notifications
- **Cloudinary** account for file uploads

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd riche
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/healthcare_db"

# NextAuth.js
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Email Service (Resend)
RESEND_API_KEY="your-resend-api-key"

# File Upload (Cloudinary)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Admin Access
NEXT_PUBLIC_ADMIN_PASSKEY="123456"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Setup

```bash
# Generate Prisma client
pnpm prisma generate

# Run database migrations
pnpm prisma db push

# Optional: Open Prisma Studio
pnpm prisma studio
```

### 5. Run Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

---

## 📊 Database Schema

### Core Models

#### User Model
```prisma
model User {
  id                     String       @id @default(uuid())
  name                   String?
  email                  String?      @unique
  phone                  String?
  role                   UserRole     @default(USER)
  onboarded              Boolean      @default(false)
  // Relations
  patients               Patient[]
  appointments           Appointment[]
}
```

#### Patient Model
```prisma
model Patient {
  id                      String       @id @default(uuid())
  userId                  String
  name                    String
  email                   String
  phone                   String
  birthDate               DateTime
  gender                  Gender
  address                 String
  primaryPhysician        String
  // Medical Information
  allergies               String?
  currentMedication       String?
  familyMedicalHistory    String?
  // Relations
  appointments            Appointment[]
}
```

#### Appointment Model
```prisma
model Appointment {
  id                  String      @id @default(uuid())
  patientId           String
  userId              String
  schedule            DateTime
  status              Status      // pending, scheduled, cancelled
  primaryPhysician    String
  reason              String
  note                String
  cancellationReason  String?
  // Relations
  patient             Patient
  user                User
}
```

---

## 🎯 Core Features

### 1. Patient Registration System

**Location**: `src/components/appointment/forms/PatientForm.tsx`

- **User Creation**: Basic user information capture
- **Comprehensive Registration**: Medical history, insurance, emergency contacts
- **Document Upload**: Identification document management
- **Consent Management**: Treatment, disclosure, and privacy consents

### 2. Appointment Management

**Location**: `src/lib/actions/appointment.actions.ts`

#### Key Functions:
- `createAppointment()`: Create new appointments with automatic status assignment
- `updateAppointment()`: Schedule/cancel appointments with email notifications
- `getRecentAppointmentList()`: Fetch appointments with statistics

#### Appointment Lifecycle:
1. **Pending**: Initial appointment request
2. **Scheduled**: Admin-confirmed appointment
3. **Cancelled**: Cancelled by admin or patient

### 3. Admin Dashboard

**Location**: `src/components/appointment/table/`

- **Real-time Table**: Live appointment data with TanStack Table
- **Status Management**: Visual status badges and quick actions
- **Bulk Operations**: Schedule/cancel multiple appointments
- **Statistics Dashboard**: Appointment counts and trends

### 4. Email Notification System

**Location**: `src/lib/mail.ts`

- **Appointment Confirmations**: Automated scheduling confirmations
- **Cancellation Notices**: Professional cancellation notifications
- **Custom Templates**: Branded email templates with CarePulse branding

---

## 🔧 API Endpoints

### Appointment Actions (Server Actions)

```typescript
// Create Appointment
const newAppointment = await createAppointment({
  userId: "user-id",
  patientId: "patient-id",
  schedule: new Date(),
  status: Status.pending,
  primaryPhysician: "Dr. John Green",
  reason: "Regular checkup",
  note: "Optional notes"
});

// Update Appointment
const updatedAppointment = await updateAppointment({
  appointmentId: "appointment-id",
  userId: "user-id",
  timeZone: "America/New_York",
  appointment: {
    status: Status.scheduled,
    schedule: new Date()
  },
  type: "schedule"
});

// Get Appointments
const appointmentList = await getRecentAppointmentList();
```

---

## 🎨 UI Components

### Form Components
- **CustomFormField**: Flexible form field component with multiple types
- **AppointmentForm**: Dynamic appointment creation/update forms
- **PatientForm**: Multi-step patient registration
- **RegisterForm**: Complete patient onboarding

### Data Display Components
- **DataTable**: Advanced table with pagination and sorting
- **StatusBadge**: Visual status indicators
- **StatCard**: Dashboard statistics cards
- **AppointmentModal**: Schedule/cancel modals

### Layout Components
- **SiteHeader**: Navigation with authentication
- **AdminDashboard**: Complete admin interface
- **PatientDashboard**: Patient appointment overview

---

## 🔒 Authentication & Authorization

### Role-Based Access Control

```typescript
enum UserRole {
  ADMIN  // Full system access
  USER   // Patient access only
}
```

### Protected Routes
- `/admin` - Admin dashboard (ADMIN only)
- `/appointment` - User appointments (Authenticated)
- `/patients/[id]/register` - Patient registration (User only)

### Security Features
- **NextAuth.js Integration**: Secure authentication flow
- **Password Hashing**: bcryptjs for password security
- **Two-Factor Authentication**: Optional 2FA support
- **Session Management**: JWT-based sessions
- **CSRF Protection**: Built-in CSRF protection

---

## 📱 Responsive Design

The platform is fully responsive with mobile-first design principles:

- **Mobile (< 768px)**: Single-column layout, touch-optimized
- **Tablet (768px - 1024px)**: Two-column grid layouts
- **Desktop (> 1024px)**: Full multi-column experience
- **Large Screens (> 1400px)**: Optimized wide layouts

---

## 🧪 Testing Strategy

### Planned Testing Approach
- **Unit Tests**: Component and utility function testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Full user journey testing
- **Performance Tests**: Load testing for appointment scheduling

---

## 🚀 Deployment

### Production Checklist
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Email service configured
- [ ] Admin credentials set
- [ ] File upload service connected
- [ ] Performance optimization completed

### Recommended Platforms
- **Vercel**: Seamless Next.js deployment
- **Railway**: Full-stack deployment with PostgreSQL
- **Netlify**: Static deployment with serverless functions

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Use shadcn/ui components when possible
- Implement proper error handling
- Add comprehensive comments
- Follow Next.js App Router patterns

---

## 📞 Support & Contact

For questions and support:
- **Documentation**: Check this README and inline code comments
- **Issues**: Open GitHub issues for bugs and feature requests
- **Discussions**: Use GitHub Discussions for general questions

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Inspiration**: Adrian Hajdin's Healthcare Project
- **UI Library**: shadcn/ui component library
- **Icons**: Lucide React icon library
- **Styling**: Tailwind CSS framework
- **Backend**: Prisma ORM and PostgreSQL

---

## 🗺️ Roadmap

### Phase 1 (Current) - Core Features ✅
- [x] Patient registration system
- [x] Appointment scheduling
- [x] Admin dashboard
- [x] Email notifications
- [x] Status management

### Phase 2 - Enhanced Features 🚧
- [ ] SMS notifications via Twilio
- [ ] Advanced reporting and analytics
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Telemedicine integration

### Phase 3 - Advanced Features 📋
- [ ] AI-powered appointment optimization
- [ ] Electronic health records (EHR)
- [ ] Payment processing integration
- [ ] Insurance verification
- [ ] Prescription management

---

*Built with ❤️ for modern healthcare management*
