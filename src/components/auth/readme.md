# Authentication Block Documentation

This document outlines the authentication implementation using NextAuth.js (AuthJS) in our project.

## Core Dependencies

```bash
# Main dependencies
pnpm add next-auth@5.0.0-beta.25 @auth/prisma-adapter@^2.9.0 bcryptjs@^3.0.2 @prisma/client@^6.3.1

# Development dependencies
pnpm add -D prisma@^6.3.1
```

## Auth Configuration Overview

Our auth implementation includes:

### 1. Session Configuration
- JWT-based sessions
- Custom session data including user role and 2FA status
- Secure cookie configuration for production

### 2. Authentication Features
- Credential-based authentication
- OAuth providers (Google, Facebook)
- Two-factor authentication (2FA)
- Email verification
- Password reset flow

### 3. Security Features
- CSRF protection
- Secure cookie handling
- Rate limiting
- Email verification requirement
- Role-based access control

### 4. Custom Pages
- `/login` - Custom login page
- `/error` - Error handling page
- `/join` - Registration page
- `/reset` - Password reset
- `/new-verification` - Email verification
- `/new-password` - Password update

### 5. Callbacks
- `signIn()` - Handles credentials and OAuth sign-in
- `session()` - Manages custom session data
- `jwt()` - Handles JWT token customization

### 6. Events
- `linkAccount` - OAuth account linking
- `signIn` - Sign-in logging and verification

## Directory Structure
```
src/components/auth/
├── account.ts          # Account management
├── user.ts            # User operations
├── validation.ts      # Input validation
├── verification/      # 2FA & email verification
├── join/             # Registration
├── login/            # Authentication
├── password/         # Password management
└── setting/          # User settings
```

## Environment Variables Required
```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
```
