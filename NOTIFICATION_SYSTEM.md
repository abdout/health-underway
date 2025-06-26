# Notification System Documentation

## Overview
The notification system handles both in-app notifications and external notifications (Telegram) for the paediatric doctor onboarding process.

## System Components

### 1. In-App Notifications
- **Status**: ✅ Ready
- **Database Table**: `Notification`
- **Trigger**: When a paediatric doctor submits their profile
- **Recipients**: All users with `ADMIN` or `MEMBERSHIP` roles
- **Implementation**: `src/components/notifications/action.ts`
- **UI Components**: 
  - Notification List: `src/components/notifications/NotificationList.tsx`
  - Notification Icon: `src/components/notifications/NotificationIcon.tsx`

### 2. Telegram Notifications
- **Status**: ✅ Configured
- **Bot Token**: ✅ Configured (`7532530964:AAHWWKT9yNv1SbZpSj6hJtCBBm0ScoGiX4g`)
- **Admin Chat ID**: ✅ Configured (`5357183430`)
- **Implementation**: `src/components/notifications/telegram.ts`
- **Testing**: Available at `/dashboard/notifications/test`

## Configuration Status

### Environment Variables
```env
TELEGRAM_NOTIFICATIONS_ENABLED=true
TELEGRAM_BOT_TOKEN=7532530964:AAHWWKT9yNv1SbZpSj6hJtCBBm0ScoGiX4g
MEMBERSHIP_SECRETARY_TELEGRAM_CHAT_ID=5357183430
MEMBERSHIP_NOTIFICATIONS_CHANNEL=@your_channel_name
```

### Implementation Status
1. ✅ In-app notifications database schema
2. ✅ In-app notifications UI components
3. ✅ Telegram bot configuration
4. ✅ Telegram private messages
5. ✅ Notification testing interface
6. ✅ Error handling and logging
7. ✅ Admin-only access controls
8. ⚠️ Channel notifications (pending channel creation)

## Testing Interface

A dedicated testing interface is available at `/dashboard/notifications/test` for administrators to:
- Verify bot configuration
- Test private messages
- View bot information
- Check notification delivery

### Access Control
- Only users with `ADMIN` or `MEMBERSHIP` roles can access the testing interface
- Unauthorized users are redirected to login

### Test Components
1. **API Endpoint**: `/api/notifications/test`
   - Validates bot token
   - Tests admin message delivery
   - Returns detailed status information

2. **UI Component**: `TestNotification`
   - Visual feedback for test results
   - Bot information display
   - Error handling and display

## Notification Flow

### Profile Submission Flow
1. User submits paediatric profile
2. System updates profile status to 'PENDING'
3. Triggers `notifyOnboardingSubmission`
4. Creates in-app notifications for admins
5. Sends Telegram notifications:
   - Private message to membership secretary
   - Channel message (when configured)

### Message Format

#### In-App Notification
```typescript
{
  title: 'طلب عضوية جديد',
  content: `قام ${applicantName} بتقديم طلب عضوية جديد وهو بانتظار المراجعة`,
  type: NotificationType.ONBOARDING_SUBMITTED,
  metadata: {
    applicantId,
    applicantName,
    applicantEmail,
    applicantPhone,
    applicantWhatsapp
  }
}
```

#### Telegram Message (Private)
```
<b>طلب عضوية جديد</b>

الاسم: {applicantName}
البريد الإلكتروني: {applicantEmail || 'غير متوفر'}
رقم الهاتف: {applicantPhone || 'غير متوفر'}

يرجي مراجعة الطلب من هنا:
nmbdsd.org/dashboard/membership
```

## Testing Instructions

### Using the Test Interface
1. Navigate to `/dashboard/notifications/test`
2. Click "Run Test" to verify all channels
3. Check the results in the interface
4. Verify actual message delivery

### Development Mode
- Set `TELEGRAM_DEV_MODE_ONLY_LOG=true` to log messages without sending
- Messages will be logged to console with 🤖 prefix

### Production Testing
1. Submit a paediatric profile
2. Verify in-app notifications in admin dashboard
3. Check Telegram private message to admin
4. Monitor error logs for any issues

## Troubleshooting

### Common Issues
1. **Telegram Bot Token Invalid**
   - Use `/start` with bot in private chat
   - Check bot permissions
   - Use test interface to validate token

2. **Messages Not Sending**
   - Check environment variables
   - Verify bot permissions
   - Use test interface to diagnose
   - Check server logs for errors

3. **In-App Notifications Missing**
   - Check user roles in database
   - Verify database connectivity
   - Check notification table schema
   - Monitor server logs

### Error Handling
- All operations are wrapped in try-catch blocks
- Errors are logged to console
- Failed notifications don't block profile submission
- Detailed error messages in test interface

## Security Measures
1. **Access Control**
   - Role-based access to test interface
   - Secure API endpoints
   - Environment variable protection

2. **Data Protection**
   - Sanitized message content
   - Validated chat IDs
   - Protected bot token

3. **Error Prevention**
   - Input validation
   - Type checking
   - Safe error messages

## Monitoring
1. **Server Logs**
   - Notification attempts
   - Delivery status
   - Error messages

2. **Test Interface**
   - Bot status
   - Message delivery
   - Configuration issues

## Next Steps
1. Monitor initial deployment
2. Gather user feedback
3. Consider additional notification channels
4. Implement analytics
5. Add message templates for different languages 