import { NextRequest, NextResponse } from "next/server";

// TEMPORARY DEBUG ENDPOINT FOR FACEBOOK OAUTH - REMOVE AFTER FIXING
export async function GET(request: NextRequest) {
  const debugKey = request.nextUrl.searchParams.get('debug');
  if (process.env.NODE_ENV === 'production' && debugKey !== 'facebook-debug') {
    return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
  }

  // Check Facebook-specific configuration
  const facebookConfig = {
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    authSecret: process.env.AUTH_SECRET,
    nextAuthUrl: process.env.NEXTAUTH_URL,
    nodeEnv: process.env.NODE_ENV,
  };

  // Test Facebook API endpoint accessibility
  let facebookApiTest;
  try {
    const testUrl = `https://graph.facebook.com/v18.0/me?access_token=test`;
    const response = await fetch(testUrl);
    facebookApiTest = {
      accessible: response.status !== 0,
      status: response.status,
      statusText: response.statusText
    };
  } catch (error) {
    facebookApiTest = {
      accessible: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    facebookConfig: {
      clientIdSet: !!facebookConfig.clientId,
      clientIdLength: facebookConfig.clientId?.length || 0,
      clientSecretSet: !!facebookConfig.clientSecret,
      clientSecretLength: facebookConfig.clientSecret?.length || 0,
      authSecretSet: !!facebookConfig.authSecret,
      authSecretLength: facebookConfig.authSecret?.length || 0,
      nextAuthUrlSet: !!facebookConfig.nextAuthUrl,
      nextAuthUrl: facebookConfig.nextAuthUrl,
      nodeEnv: facebookConfig.nodeEnv,
    },
    facebookApiTest,
    expectedCallbackUrl: `${facebookConfig.nextAuthUrl}/api/auth/callback/facebook`,
    debugInfo: {
      message: "Check Facebook Developer Console for any app restrictions or status issues",
      steps: [
        "1. Verify Facebook app is in 'Live' mode (not Development)",
        "2. Check if app has any domain restrictions",
        "3. Verify Facebook Login product is properly configured",
        "4. Check app permissions and scopes"
      ]
    }
  });
} 