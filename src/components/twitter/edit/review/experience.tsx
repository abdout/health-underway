import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReviewCardProps } from './type';

export function WorkExperienceCard({ userData }: ReviewCardProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Professional Experience</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {userData?.currentOccupation ? (
          <div className="space-y-4">
            <div className="border-r-4 border-primary pr-4 py-2">
              <p className="text-md">
                {userData.currentOccupation}
                {userData.companyName ? ` at ${userData.companyName}` : ''}
                {userData.employmentSector ? ` (${userData.employmentSector})` : ''}
              </p>
              {userData.workplaceAddress && (
                <p className="text-sm text-gray-700 mt-1">{userData.workplaceAddress}</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No professional experience information available</p>
        )}
      </CardContent>
    </Card>
  );
} 