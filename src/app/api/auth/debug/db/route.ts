import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// TEMPORARY DEBUG ENDPOINT FOR DATABASE CONNECTION - REMOVE AFTER FIXING
export async function GET(request: NextRequest) {
  const debugKey = request.nextUrl.searchParams.get('debug');
  if (process.env.NODE_ENV === 'production' && debugKey !== 'db-debug') {
    return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
  }

  let dbTest = {
    connected: false,
    error: null as string | null,
    userTableExists: false,
    accountTableExists: false,
    verificationTokenTableExists: false,
  };

  try {
    // Test basic database connection
    await db.$connect();
    dbTest.connected = true;

    // Test if required tables exist for NextAuth
    try {
      await db.user.findFirst({ take: 1 });
      dbTest.userTableExists = true;
    } catch (e) {
      dbTest.error = `User table issue: ${e instanceof Error ? e.message : 'Unknown error'}`;
    }

    try {
      await db.account.findFirst({ take: 1 });
      dbTest.accountTableExists = true;
    } catch (e) {
      if (!dbTest.error) {
        dbTest.error = `Account table issue: ${e instanceof Error ? e.message : 'Unknown error'}`;
      }
    }

    try {
      await db.verificationToken.findFirst({ take: 1 });
      dbTest.verificationTokenTableExists = true;
    } catch (e) {
      if (!dbTest.error) {
        dbTest.error = `VerificationToken table issue: ${e instanceof Error ? e.message : 'Unknown error'}`;
      }
    }

  } catch (error) {
    dbTest.connected = false;
    dbTest.error = error instanceof Error ? error.message : 'Unknown database error';
  } finally {
    try {
      await db.$disconnect();
    } catch (e) {
      // Ignore disconnect errors
    }
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    databaseUrl: process.env.DATABASE_URL ? `${process.env.DATABASE_URL.substring(0, 20)}...` : 'NOT SET',
    dbTest,
    prismaVersion: "6.9.0", // From your logs
    recommendation: dbTest.connected && dbTest.userTableExists && dbTest.accountTableExists 
      ? "Database connection looks good"
      : "Database connection issues detected - run prisma migrate/push"
  });
} 