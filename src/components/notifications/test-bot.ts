'use server';

import { validateBotToken } from './telegram';

export async function testBotConfiguration() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) {
    return { success: false, error: 'Bot token not configured' };
  }

  const validation = await validateBotToken(botToken);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  // Test sending a message to admin
  const adminChatId = process.env.MEMBERSHIP_SECRETARY_TELEGRAM_CHAT_ID;
  if (!adminChatId) {
    return { success: false, error: 'Admin chat ID not configured' };
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: adminChatId,
        text: '🔔 Test notification: Bot configuration check',
        parse_mode: 'HTML'
      })
    });

    const data = await response.json();
    if (!data.ok) {
      return { success: false, error: data.description };
    }

    return { 
      success: true, 
      botInfo: validation.botInfo,
      message: 'Bot configured and test message sent successfully'
    };
  } catch (error) {
    return { success: false, error: 'Failed to send test message' };
  }
} 