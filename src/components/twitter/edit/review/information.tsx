import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReviewCardProps } from './type';
// Labels are now in English, no need for Arabic label utils

export function PersonalInfoCard({ userData }: ReviewCardProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Full Name</p>
            <p>{userData?.fullname || 'Not specified'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Email</p>
            <p>{userData?.email || 'Not specified'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Phone Number</p>
            <p>{userData?.phone || 'Not specified'}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">WhatsApp</p>
            <p>{userData?.whatsapp || 'Not specified'}</p>
          </div>
          
          {/* Birth Information */}
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Place of Birth</p>
            <p>
              {userData?.birthCountry && userData?.birthLocality 
                ? `${userData.birthCountry} - ${userData.birthLocality}` 
                : userData?.birthCountry || userData?.birthLocality || 'Not specified'}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p>
              {userData?.birthMonth && userData?.birthYear 
                ? `${userData.birthMonth}/${userData.birthYear}` 
                : 'Not specified'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 