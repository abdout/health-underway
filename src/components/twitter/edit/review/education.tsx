import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReviewCardProps } from './type';
import { studentYears } from '../education/constant';

export function EducationCard({ userData }: ReviewCardProps) {
  // Function to map year value to year label
  const getYearLabel = (yearValue: string | number) => {
    const yearString = yearValue.toString();
    const year = studentYears.find(y => y.value === yearString);
    return year ? `Year ${year.label}` : `Year ${yearString}`;
  };

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Educational Qualifications</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Student Information */}
          {userData?.educationLevel === "student" && userData?.studentInstitution && (
            <div className="border-r-4 border-primary pr-4 py-2">
              <p className="text-md">
                Student at {userData.studentInstitution}
                {userData.studentFaculty ? ` majoring in ${userData.studentFaculty}` : ''}
                {userData.studentYear ? ` - ${getYearLabel(userData.studentYear)}` : ''}
              </p>
            </div>
          )}
          
          {/* PhD Information */}
          {userData?.phdInstitution && (
            <div className="border-r-4 border-primary pr-4 py-2">
              <p className="text-md">
                PhD {userData.phdMajor ? `in ${userData.phdMajor}` : ''}
                {userData.phdInstitution ? `, ${userData.phdInstitution}` : ''}
                {userData.phdCompletionYear ? ` - ${userData.phdCompletionYear}` : ''}
              </p>
            </div>
          )}
          
          {/* Master's Information */}
          {userData?.masterInstitution && (
            <div className="border-r-4 border-primary pr-4 py-2">
              <p className="text-md">
                Master's {userData.masterMajor ? `in ${userData.masterMajor}` : ''}
                {userData.masterInstitution ? `, ${userData.masterInstitution}` : ''}
                {userData.masterCompletionYear ? ` - ${userData.masterCompletionYear}` : ''}
              </p>
            </div>
          )}
          
          {/* Bachelor's Information */}
          {userData?.bachelorInstitution && (
            <div className="border-r-4 border-primary pr-4 py-2">
              <p className="text-md">
                Bachelor's {userData.bachelorMajor ? `${userData.bachelorMajor}` : ''}
                {userData.bachelorInstitution ? `, ${userData.bachelorInstitution}` : ''}
                {userData.bachelorCompletionYear ? ` - ${userData.bachelorCompletionYear}` : ''}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 