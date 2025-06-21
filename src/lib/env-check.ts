// Environment variable validation script

const requiredEnvVars = [
  'AUTH_SECRET', // Critical for NextAuth.js
  'NEXTAUTH_URL', // Required for production
  'FACEBOOK_CLIENT_ID',
  'FACEBOOK_CLIENT_SECRET',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'NEXT_PUBLIC_APP_URL',
  'DATABASE_URL', // Required for Prisma
];

const optionalEnvVars = [
  'RESEND_API_KEY',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
];

export function checkRequiredEnvVars() {
  const missing: string[] = [];
  const present: string[] = [];
  
  for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
      missing.push(varName);
    } else {
      present.push(varName);
    }
  }
  
  // Always log what we found for debugging
  console.log('=== Environment Variables Debug ===');
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Present variables:', present);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(varName => {
      console.error(`   - ${varName}: ${process.env[varName] ? 'SET' : 'NOT SET'}`);
    });
    console.error('These variables must be set for authentication to work properly.');
    
    // Provide specific guidance for missing variables
    if (missing.includes('AUTH_SECRET')) {
      console.error('💡 Generate AUTH_SECRET with: `npx auth secret`');
    }
    if (missing.includes('NEXTAUTH_URL')) {
      console.error('💡 Set NEXTAUTH_URL to your production domain (e.g., https://hc.databayt.org)');
    }
    
    return false;
  }
  
  console.log('✅ All required environment variables are set.');
  return true;
}

export function checkOptionalEnvVars() {
  const missing: string[] = [];
  
  for (const varName of optionalEnvVars) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }
  
  if (missing.length > 0) {
    console.warn('⚠️  Optional environment variables not set:');
    missing.forEach(varName => {
      console.warn(`   - ${varName}`);
    });
    console.warn('Some features may not work without these variables.');
  }
}

export function logOAuthConfig() {
  console.log('=== OAuth Configuration Debug ===');
  console.log(`AUTH_SECRET: ${process.env.AUTH_SECRET ? `✅ Set (${process.env.AUTH_SECRET.substring(0, 10)}...)` : '❌ Missing'}`);
  console.log(`NEXTAUTH_URL: ${process.env.NEXTAUTH_URL || '❌ Missing'}`);
  console.log(`FACEBOOK_CLIENT_ID: ${process.env.FACEBOOK_CLIENT_ID ? `✅ Set (${process.env.FACEBOOK_CLIENT_ID.substring(0, 10)}...)` : '❌ Missing'}`);
  console.log(`FACEBOOK_CLIENT_SECRET: ${process.env.FACEBOOK_CLIENT_SECRET ? `✅ Set (${process.env.FACEBOOK_CLIENT_SECRET.substring(0, 10)}...)` : '❌ Missing'}`);
  console.log(`GOOGLE_CLIENT_ID: ${process.env.GOOGLE_CLIENT_ID ? `✅ Set (${process.env.GOOGLE_CLIENT_ID.substring(0, 20)}...)` : '❌ Missing'}`);
  console.log(`GOOGLE_CLIENT_SECRET: ${process.env.GOOGLE_CLIENT_SECRET ? `✅ Set (${process.env.GOOGLE_CLIENT_SECRET.substring(0, 10)}...)` : '❌ Missing'}`);
  console.log(`NEXT_PUBLIC_APP_URL: ${process.env.NEXT_PUBLIC_APP_URL || '❌ Missing'}`);
  console.log(`DATABASE_URL: ${process.env.DATABASE_URL ? `✅ Set (${process.env.DATABASE_URL.substring(0, 20)}...)` : '❌ Missing'}`);
  console.log('=== End OAuth Configuration ===');
}

// Add this to your app initialization to check env vars
export function validateEnv() {
  console.log('🔍 Starting environment validation...');
  const varsValid = checkRequiredEnvVars();
  checkOptionalEnvVars();
  
  if (varsValid) {
    logOAuthConfig();
  }
  
  console.log('🔍 Environment validation complete.');
  return varsValid;
} 