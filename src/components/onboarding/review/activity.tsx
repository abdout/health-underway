import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReviewCardProps } from './type';

// Helper function to format dates with English month names
const formatDateWithEnglishMonth = (date: Date): string => {
  const englishMonths: Record<string, string> = {
    "1": "January", "2": "February", "3": "March", "4": "April",
    "5": "May", "6": "June", "7": "July", "8": "August",
    "9": "September", "10": "October", "11": "November", "12": "December"
  };
  
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${englishMonths[month.toString()]} ${year}`;
};

export function ActivitiesCard({ userData }: ReviewCardProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Activities and Affiliations</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className='flex flex-col md:flex-row space-x-14 pb-6 -ml-10'>
          {/* Skills */}
          {userData?.skills && userData.skills.length > 0 && (
            <div className="w-full md:w-1/2 pl-4 ">
              <p className="text-sm text-gray-500">Skills</p>
              <div className="flex flex-wrap gap-2 mt-2 ">
                {userData.skills.map((skill, index) => (
                  <span key={index} className="md:px-2 py-1 bg-neutral-100 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Interests */}
          {userData?.interests && userData.interests.length > 0 && (
            <div className="w-full md:w-1/2 ">
              <p className="text-sm text-gray-500 pt-3 md:pt-0">Interests</p>
              <div className="flex gap-2 mt-2">
                {userData.interests.map((interest, index) => (
                  <span key={index} className="px-2 py-1 bg-neutral-100 rounded-full text-sm">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          {/* Political Party */}
          {userData?.partyMember && (
            <div className="border-r-4 border-primary pr-4 py-2">
              <p className="text-md">
                Member of {userData.partyName ? `${userData.partyName} Party` : 'Political Party'}
                {(userData?.partyStartDate || userData?.partyEndDate) && ' from '}
                {userData.partyStartDate ? formatDateWithEnglishMonth(new Date(userData.partyStartDate)) : ''}
                {userData.partyEndDate ? ` to ${formatDateWithEnglishMonth(new Date(userData.partyEndDate))}` : userData.partyStartDate ? ' to present' : ''}
              </p>
            </div>
          )}
          
          {/* Union */}
          {userData?.unionMember && (
            <div className="border-r-4 border-primary pr-4 py-2">
              <p className="text-md">
                Member of {userData.unionName ? `${userData.unionName} Union` : 'Union'}
                {(userData?.unionStartDate || userData?.unionEndDate) && ' from '}
                {userData.unionStartDate ? formatDateWithEnglishMonth(new Date(userData.unionStartDate)) : ''}
                {userData.unionEndDate ? ` to ${formatDateWithEnglishMonth(new Date(userData.unionEndDate))}` : userData.unionStartDate ? ' to present' : ''}
              </p>
            </div>
          )}
          
          {/* NGO */}
          {userData?.ngoMember && (
            <div className="border-r-4 border-primary pr-4 py-2">
              <p className="text-md">
                Member of {userData.ngoName ? `${userData.ngoName} Organization` : 'NGO'}
                {userData?.ngoActivity ? ` (${userData.ngoActivity})` : ''}
              </p>
            </div>
          )}
          
          {/* Club */}
          {userData?.clubMember && (
            <div className="border-r-4 border-primary pr-4 py-2">
              <p className="text-md">
                Member of {userData.clubName ? `${userData.clubName} Club` : 'Club'}
                {userData?.clubType ? ` (${userData.clubType})` : ''}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 