import { NextRequest, NextResponse } from "next/server";

// TEMPORARY DEBUG ENDPOINT - REMOVE AFTER FIXING
export async function GET(request: NextRequest) {
  // Only allow this in development or with specific debug key
  const debugKey = request.nextUrl.searchParams.get('debug');
  if (process.env.NODE_ENV === 'production' && debugKey !== 'check-env-vars') {
    return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
  }

  const requiredEnvVars = [
    'AUTH_SECRET',
    'NEXTAUTH_URL', 
    'FACEBOOK_CLIENT_ID',
    'FACEBOOK_CLIENT_SECRET',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'NEXT_PUBLIC_APP_URL',
    'DATABASE_URL',
  ];

  const envStatus = requiredEnvVars.reduce((acc, varName) => {
    acc[varName] = {
      isSet: !!process.env[varName],
      value: process.env[varName] ? `${process.env[varName].substring(0, 10)}...` : 'NOT SET',
      length: process.env[varName]?.length || 0
    };
    return acc;
  }, {} as Record<string, { isSet: boolean; value: string; length: number }>);

  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    variables: envStatus,
    allSet: Object.values(envStatus).every(v => v.isSet)
  });
} 