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
  
  for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    console.error('These variables must be set for authentication to work properly.');
    
    // Provide specific guidance for missing variables
    if (missing.includes('AUTH_SECRET')) {
      console.error('💡 Generate AUTH_SECRET with: `npx auth secret`');
    }
    if (missing.includes('NEXTAUTH_URL')) {
      console.error('💡 Set NEXTAUTH_URL to your production domain (e.g., https://yourdomain.com)');
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
  console.log('=== OAuth Configuration ===');
  console.log(`AUTH_SECRET: ${process.env.AUTH_SECRET ? '✅ Set' : '❌ Missing'}`);
  console.log(`NEXTAUTH_URL: ${process.env.NEXTAUTH_URL || '❌ Missing'}`);
  console.log(`FACEBOOK_CLIENT_ID: ${process.env.FACEBOOK_CLIENT_ID?.substring(0, 5)}...`);
  console.log(`FACEBOOK_CLIENT_SECRET: ${process.env.FACEBOOK_CLIENT_SECRET ? '✅ Set' : '❌ Missing'}`);
  console.log(`GOOGLE_CLIENT_ID: ${process.env.GOOGLE_CLIENT_ID?.substring(0, 5)}...`);
  console.log(`GOOGLE_CLIENT_SECRET: ${process.env.GOOGLE_CLIENT_SECRET ? '✅ Set' : '❌ Missing'}`);
  console.log(`NEXT_PUBLIC_APP_URL: ${process.env.NEXT_PUBLIC_APP_URL}`);
  console.log(`DATABASE_URL: ${process.env.DATABASE_URL ? '✅ Set' : '❌ Missing'}`);
  console.log('=========================');
}

// Add this to your app initialization to check env vars
export function validateEnv() {
  const varsValid = checkRequiredEnvVars();
  checkOptionalEnvVars();
  
  if (varsValid) {
    logOAuthConfig();
  }
  return varsValid;
} 