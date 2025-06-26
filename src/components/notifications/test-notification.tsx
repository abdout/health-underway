'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle } from 'lucide-react';

export function TestNotification() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success?: boolean;
    error?: string;
    botInfo?: any;
    message?: string;
  } | null>(null);

  const testNotifications = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/notifications/test');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ success: false, error: 'Failed to test notifications' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Notifications</CardTitle>
        <CardDescription>
          Test all notification channels (In-app and Telegram)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={testNotifications} 
          disabled={loading}
        >
          {loading ? 'Testing...' : 'Run Test'}
        </Button>

        {result && (
          <Alert variant={result.success ? 'default' : 'destructive'}>
            {result.success ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            <AlertTitle>
              {result.success ? 'Success' : 'Error'}
            </AlertTitle>
            <AlertDescription>
              {result.success ? (
                <>
                  <p>{result.message}</p>
                  {result.botInfo && (
                    <div className="mt-2 text-sm">
                      <p>Bot Name: {result.botInfo.firstName}</p>
                      <p>Username: @{result.botInfo.username}</p>
                    </div>
                  )}
                </>
              ) : (
                result.error
              )}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
} 