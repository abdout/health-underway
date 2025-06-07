# Appointment System Implementation Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Database Schema](#database-schema)
3. [Data Models & Types](#data-models--types)
4. [Core Business Logic](#core-business-logic)
5. [Form Validation](#form-validation)
6. [User Interface Components](#user-interface-components)
7. [Email Notification System](#email-notification-system)
8. [Data Flow Diagrams](#data-flow-diagrams)
9. [API Endpoints & Actions](#api-endpoints--actions)
10. [Error Handling](#error-handling)
11. [Configuration & Constants](#configuration--constants)

## System Overview

The appointment system is a comprehensive healthcare appointment management solution built with Next.js, Prisma, and TypeScript. It supports three main appointment states: **pending**, **scheduled**, and **cancelled**. The system includes patient registration, appointment creation, management workflows, and automated email notifications.

### Key Features
- **Multi-role System**: Supports USER and ADMIN roles
- **Real-time Management**: Admin dashboard for appointment oversight
- **Email Notifications**: Automated confirmations and cancellations
- **Status Tracking**: Three-state appointment lifecycle
- **Doctor Assignment**: Pre-configured physician selection
- **Form Validation**: Comprehensive input validation with Zod schemas

## Database Schema

### Core Models

#### Appointment Model
```prisma
model Appointment {
  id                  String      @id @default(auto()) @map("_id") @db.ObjectId
  patientId           String      @db.ObjectId
  patient             Patient     @relation(fields: [patientId], references: [id], onDelete: Cascade, name: "PatientAppointments")
  userId              String      @db.ObjectId
  user                User        @relation(fields: [userId], references: [id], onDelete: Cascade, name: "UserAppointments")
  schedule            DateTime
  status              Status
  primaryPhysician    String
  reason              String
  note                String
  cancellationReason  String?
  createdAt           DateTime    @default(now())
  updatedAt           DateTime    @updatedAt
}
```

#### Status Enum
```prisma
enum Status {
  pending
  scheduled
  cancelled
}
```

### Key Relationships
- **User → Appointments**: One-to-many relationship via `userId`
- **Patient → Appointments**: One-to-many relationship via `patientId`
- **Cascading Deletes**: Appointments are deleted when user or patient is removed

## Data Models & Types

### Core Type Definitions

#### CreateAppointmentParams
```typescript
export type CreateAppointmentParams = {
  patientId: string;
  userId: string;
  schedule: Date;
  status: Status;
  primaryPhysician: string;
  reason: string;
  note: string;
};
```

#### UpdateAppointmentParams
```typescript
export type UpdateAppointmentParams = {
  userId: string;
  appointmentId: string;
  timeZone: string;
  appointment: Partial<AppointmentUpdateData>;
  type: 'schedule' | 'cancel';
};
```

#### AppointmentWithPatient
```typescript
export type AppointmentWithPatient = Prisma.AppointmentGetPayload<{
  include: { patient: true };
}>;
```

#### AppointmentCounts
```typescript
type AppointmentCounts = {
  totalCount: number;
  scheduledCount: number;
  pendingCount: number;
  cancelledCount: number;
  documents: AppointmentWithPatient[];
};
```

## Core Business Logic

### 1. Appointment Creation (`createAppointment`)

**Location**: `src/lib/actions/appointment.actions.ts:20-36`

```typescript
export const createAppointment = async (
  appointmentData: Prisma.AppointmentUncheckedCreateInput
): Promise<Appointment | null> => {
  try {
    const newAppointment = await db.appointment.create({
      data: {
        ...appointmentData,
        note: appointmentData.note || "",
      },
    });

    revalidatePath("/admin");
    return newAppointment;
  } catch (error) {
    console.error("Error creating appointment:", error);
    return null;
  }
};
```

**Business Rules**:
- Ensures `note` field is never null (defaults to empty string)
- Automatically revalidates admin dashboard cache
- Returns null on error for graceful handling

### 2. Appointment Retrieval (`getRecentAppointmentList`)

**Location**: `src/lib/actions/appointment.actions.ts:38-88`

```typescript
export const getRecentAppointmentList = async (): Promise<AppointmentCounts> => {
  try {
    const appointments: AppointmentWithPatient[] = await db.appointment.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        patient: true, 
      },
    });

    const counts = appointments.reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case Status.scheduled:
            acc.scheduledCount++;
            break;
          case Status.pending:
            acc.pendingCount++;
            break;
          case Status.cancelled:
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      {
        scheduledCount: 0,
        pendingCount: 0,
        cancelledCount: 0,
      }
    );

    return {
      totalCount: appointments.length,
      ...counts,
      documents: appointments,
    };
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return {
      totalCount: 0,
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
      documents: [],
    };
  }
};
```

**Business Logic**:
- Fetches all appointments with patient data included
- Orders by creation date (most recent first)
- Calculates status-based counts using reduce pattern
- Returns comprehensive statistics for dashboard

### 3. Appointment Updates (`updateAppointment`)

**Location**: `src/lib/actions/appointment.actions.ts:96-145`

```typescript
export const updateAppointment = async ({
  appointmentId,
  timeZone,
  appointment,
  type,
}: UpdateAppointmentInput): Promise<Appointment | null> => {
  try {
    const updatedAppointment = await db.appointment.update({
      where: { id: appointmentId },
      data: {
        ...appointment,
        note: appointment.note || "",
      },
    });

    if (!updatedAppointment) {
      throw new Error("Failed to update appointment");
    }

    const formattedDateTime = formatDateTime(
      updatedAppointment.schedule,
      timeZone
    ).dateTime;

    const patient = await db.patient.findUnique({
      where: { id: updatedAppointment.patientId },
    });

    if (patient?.email) {
      const emailSubject = type === "schedule" 
        ? "Appointment Scheduled" 
        : "Appointment Cancelled";
      const emailMessage =
        type === "schedule"
          ? `Greetings from CarePulse. Your appointment is confirmed for ${formattedDateTime} with Dr. ${updatedAppointment.primaryPhysician}.`
          : `We regret to inform you that your appointment scheduled for ${formattedDateTime} has been cancelled. Reason: ${updatedAppointment.cancellationReason}.`;

      await sendEmailNotification(patient.email, emailSubject, emailMessage);
    }

    revalidatePath("/admin");
    return updatedAppointment;
  } catch (error) {
    console.error("Error updating appointment:", error);
    return null;
  }
};
```

**Business Logic**:
- Updates appointment with provided data
- Formats datetime according to user's timezone
- Fetches patient email for notifications
- Sends contextual email based on operation type
- Revalidates admin dashboard after changes

## Form Validation

### Validation Schemas

**Location**: `src/lib/validation.ts:78-118`

#### Create Appointment Schema
```typescript
export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});
```

#### Schedule Appointment Schema
```typescript
export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});
```

#### Cancel Appointment Schema
```typescript
export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});
```

#### Schema Selection Logic
```typescript
export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
```

**Validation Rules**:
- **Doctor Selection**: Minimum 2 characters required
- **Scheduling**: Automatic date coercion
- **Reason Field**: 2-500 character limit for creation
- **Cancellation**: Required reason for cancellations (2-500 chars)
- **Notes**: Optional for all operations

## User Interface Components

### 1. AppointmentForm Component

**Location**: `src/components/forms/AppointmentForm.tsx`

#### Component Props
```typescript
{
  userId: string;
  patientId: string;
  type: AppointmentFormType; // "create" | "schedule" | "cancel"
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}
```

#### Key Features
- **Dynamic Validation**: Uses `getAppointmentSchema(type)` for form validation
- **Conditional Rendering**: Different fields shown based on operation type
- **Status Mapping**: Automatic status assignment based on form type
- **Error Handling**: Comprehensive try-catch with loading states

#### Form Submission Logic
```typescript
const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
  setIsLoading(true);

  let status: Status;
  switch (type) {
    case "schedule":
      status = Status.scheduled;
      break;
    case "cancel":
      status = Status.cancelled;
      break;
    default:
      status = Status.pending;
  }

  // Create or update logic follows...
};
```

### 2. AppointmentModal Component

**Location**: `src/components/AppointmentModal.tsx`

#### Responsibilities
- **Modal Management**: Dialog state management
- **Action Triggers**: Schedule/Cancel button styling
- **Form Integration**: Embeds AppointmentForm with context

#### Key Features
```typescript
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button
      variant="ghost"
      className={`capitalize ${type === "schedule" && "text-green-500"}`}
    >
      {type}
    </Button>
  </DialogTrigger>
  <DialogContent className="shad-dialog sm:max-w-md">
    <AppointmentForm
      userId={userId}
      patientId={patientId}
      type={type}
      appointment={appointment}
      setOpen={setOpen}
    />
  </DialogContent>
</Dialog>
```

### 3. Data Table Integration

**Location**: `src/components/table/columns.tsx`

#### Column Definitions
- **Patient Name**: Displays from joined patient data
- **Status Badge**: Visual status indicator with colors
- **Schedule**: Formatted datetime display
- **Doctor**: Shows doctor image and name
- **Actions**: Schedule/Cancel modal triggers

#### Status Badge Component
```typescript
export const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-600": status === "scheduled",
        "bg-blue-600": status === "pending",
        "bg-red-600": status === "cancelled",
      })}
    >
      <Image src={StatusIcon[status]} alt="doctor" width={24} height={24} />
      <p className={clsx("text-12-semibold capitalize", {
        "text-green-500": status === "scheduled",
        "text-blue-500": status === "pending",
        "text-red-500": status === "cancelled",
      })}>
        {status}
      </p>
    </div>
  );
};
```

## Email Notification System

**Location**: `src/lib/mail.ts:78-101`

### Email Service Implementation
```typescript
export const sendEmailNotification = async (
  toEmail: string,
  subject: string,
  content: string
) => {
  try {
    const response = await resend.emails.send({
      from: 'no-reply@databayt.org',
      to: toEmail,
      subject: subject,
      html: `<p>${content}</p>`,
    });

    console.log("Notification email sent successfully, response:", response);
    return response;
  } catch (error) {
    console.error("An error occurred while sending email notification:", error);
    throw error;
  }
};
```

### Email Templates

#### Schedule Confirmation
```
Subject: Appointment Scheduled
Message: Greetings from CarePulse. Your appointment is confirmed for [DateTime] with Dr. [PhysicianName].
```

#### Cancellation Notice
```
Subject: Appointment Cancelled
Message: We regret to inform you that your appointment scheduled for [DateTime] has been cancelled. Reason: [CancellationReason].
```

### Integration Points
- **Trigger**: Automated during appointment updates
- **Data Source**: Patient email from database
- **Context**: Dynamic message based on operation type
- **Timezone**: Formatted according to user's timezone

## Data Flow Diagrams

### Appointment Creation Flow
```
User Request → AppointmentForm → Validation → createAppointment() → Database → Success Page
```

### Appointment Update Flow
```
Admin Action → AppointmentModal → AppointmentForm → Validation → updateAppointment() → Database → Email Notification → Dashboard Refresh
```

### Dashboard Data Flow
```
Admin Page Load → getRecentAppointmentList() → Database Query → Status Counting → Statistics Display → DataTable Rendering
```

## API Endpoints & Actions

### Server Actions (Next.js App Router)

#### Create Appointment
- **Function**: `createAppointment`
- **Input**: `Prisma.AppointmentUncheckedCreateInput`
- **Output**: `Appointment | null`
- **Side Effects**: Cache revalidation

#### Get Appointments
- **Function**: `getRecentAppointmentList`
- **Input**: None
- **Output**: `AppointmentCounts`
- **Includes**: Patient data via Prisma relations

#### Update Appointment
- **Function**: `updateAppointment`
- **Input**: `UpdateAppointmentInput`
- **Output**: `Appointment | null`
- **Side Effects**: Email notification, cache revalidation

#### Get Single Appointment
- **Function**: `getAppointment`
- **Input**: `appointmentId: string`
- **Output**: `Appointment with Patient and User | null`
- **Usage**: Success page display

### Route Handlers

#### Main Routes
- `/patients/[userId]/new-appointment` - Appointment creation form
- `/patients/[userId]/new-appointment/success` - Confirmation page
- `/admin` - Admin dashboard with appointment management

## Error Handling

### Database Error Handling
```typescript
try {
  // Database operation
} catch (error) {
  console.error("Error description:", error);
  return null; // or default value
}
```

### Form Error Handling
- **Validation Errors**: Zod schema validation with field-specific messages
- **Submission Errors**: Loading states and error logging
- **Network Errors**: Graceful degradation with null returns

### Email Error Handling
```typescript
try {
  await sendEmailNotification(/* params */);
} catch (error) {
  console.error("Email sending failed:", error);
  // Continue with appointment update despite email failure
}
```

## Package Dependencies & Installation

### Required Dependencies

To implement the appointment logic system, you need to install the following packages:

#### Core Dependencies

```bash
# Using pnpm (as specified in user rules)
pnpm install @prisma/client prisma
pnpm install next react react-dom
pnpm install typescript @types/node @types/react @types/react-dom
```

#### Form Management & Validation

```bash
# Form handling and validation
pnpm install react-hook-form @hookform/resolvers
pnpm install zod

# Date picker component
pnpm install react-datepicker
pnpm install @types/react-datepicker --save-dev
```

#### UI Components (Shadcn/ui ecosystem)

```bash
# Radix UI components for form elements
pnpm install @radix-ui/react-dialog
pnpm install @radix-ui/react-select
pnpm install @radix-ui/react-label
pnpm install @radix-ui/react-slot

# Table components
pnpm install @tanstack/react-table

# Utility libraries
pnpm install clsx tailwind-merge
pnpm install class-variance-authority
```

#### Email Service

```bash
# Email notifications
pnpm install resend
```

#### Styling

```bash
# Tailwind CSS
pnpm install tailwindcss postcss autoprefixer
pnpm install tailwindcss-animate

# Lucide icons (used in select components)
pnpm install lucide-react
```

### Complete Installation Command

```bash
# Install all appointment-related dependencies at once
pnpm install @prisma/client prisma react-hook-form @hookform/resolvers zod react-datepicker @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-label @radix-ui/react-slot @tanstack/react-table clsx tailwind-merge class-variance-authority resend tailwindcss postcss autoprefixer tailwindcss-animate lucide-react

# Install dev dependencies
pnpm install @types/react-datepicker --save-dev
```

### Package Versions (Compatible with the implementation)

```json
{
  "dependencies": {
    "@prisma/client": "^5.7.1",
    "@hookform/resolvers": "^3.3.3",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-slot": "^1.1.0",
    "@tanstack/react-table": "^8.20.5",
    "react-hook-form": "^7.49.2",
    "react-datepicker": "latest",
    "zod": "^3.22.4",
    "clsx": "^2.0.0",
    "class-variance-authority": "^0.7.0",
    "tailwind-merge": "^2.2.0",
    "resend": "^2.1.0",
    "lucide-react": "^0.447.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "prisma": "^5.7.1",
    "@types/react-datepicker": "^7.0.0"
  }
}
```

### Package Purpose Breakdown

| Package | Purpose in Appointment System |
|---------|-------------------------------|
| `@prisma/client` | Database ORM for appointment CRUD operations |
| `prisma` | Database schema management and migrations |
| `react-hook-form` | Form state management in AppointmentForm |
| `@hookform/resolvers` | Zod validation integration with react-hook-form |
| `zod` | Schema validation for appointment data |
| `react-datepicker` | Date/time picker component for scheduling |
| `@radix-ui/react-dialog` | Modal dialogs for appointment actions |
| `@radix-ui/react-select` | Doctor selection dropdown |
| `@tanstack/react-table` | Admin dashboard data table |
| `resend` | Email notification service |
| `clsx` | Conditional CSS class management |
| `tailwind-merge` | Tailwind class conflict resolution |
| `lucide-react` | Icons for UI components |

### PostInstall Setup

```bash
# Generate Prisma client after installation
pnpm prisma generate

# Run database migrations (if needed)
pnpm prisma db push
```

### Environment Variables Required

```bash
# Database
MONGODB_URI="your_mongodb_connection_string"

# Email Service
RESEND_API_KEY="your_resend_api_key"

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Critical Note: Missing Dependency

**Important**: The current implementation uses `react-datepicker` but it's not listed in the project's `package.json`. You must install it:

```bash
pnpm install react-datepicker @types/react-datepicker
```

This package is essential for the date/time picker functionality in the appointment form.

## Configuration & Constants

### Doctor Configuration
**Location**: `src/constants/index.ts:43-75`

```typescript
export const Doctors = [
  { image: "/assets/images/dr-green.png", name: "John Green" },
  { image: "/assets/images/dr-cameron.png", name: "Leila Cameron" },
  { image: "/assets/images/dr-livingston.png", name: "David Livingston" },
  { image: "/assets/images/dr-peter.png", name: "Evan Peter" },
  { image: "/assets/images/dr-powell.png", name: "Jane Powell" },
  { image: "/assets/images/dr-remirez.png", name: "Alex Ramirez" },
  { image: "/assets/images/dr-lee.png", name: "Jasmine Lee" },
  { image: "/assets/images/dr-cruz.png", name: "Alyana Cruz" },
  { image: "/assets/images/dr-sharma.png", name: "Hardik Sharma" },
];
```

### Status Icons
```typescript
export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
```

### Environment Variables
- `MONGODB_URI` - Database connection string
- `RESEND_API_KEY` - Email service API key
- `NEXT_PUBLIC_APP_URL` - Application base URL

## Best Practices & Patterns

### 1. Type Safety
- Comprehensive TypeScript types for all data structures
- Prisma-generated types for database operations
- Zod schemas for runtime validation

### 2. Error Handling
- Consistent null return pattern for error cases
- Comprehensive logging for debugging
- Graceful degradation for non-critical failures

### 3. Cache Management
- Automatic cache revalidation after data mutations
- Path-specific revalidation for optimal performance

### 4. Form State Management
- React Hook Form for form state
- Zod resolver for validation integration
- Loading states for user feedback

### 5. Security Considerations
- Server-side validation for all inputs
- Proper data sanitization
- Secure email handling with external service

This documentation provides a complete trace of the appointment logic implementation, covering all aspects from database design to user interface components and business logic flows.