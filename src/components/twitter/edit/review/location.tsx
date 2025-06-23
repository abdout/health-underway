import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReviewCardProps } from './type';
import { getCountryLabel, getLocalityLabel, getNeighborhoodLabel } from '@/utils/getArabicLabel';

type LocationCardProps = ReviewCardProps & {
  title: string;
  country?: string;
  locality?: string;
  neighborhood?: string;
  showEmptyMessage?: boolean;
};

export function LocationCard({ 
  title, 
  country, 
  locality, 
  neighborhood,
  showEmptyMessage = false
}: LocationCardProps) {
  const hasLocation = country || locality || neighborhood;
  
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {hasLocation ? (
          <div className="space-y-4">
            {country && (
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Country</p>
                <p>{getCountryLabel(country)}</p>
              </div>
            )}
            {locality && (
              <div className="space-y-1">
                <p className="text-sm text-gray-500">City</p>
                <p>{getLocalityLabel(locality)}</p>
              </div>
            )}
            {neighborhood && (
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Neighborhood</p>
                <p>{getNeighborhoodLabel(neighborhood)}</p>
              </div>
            )}
          </div>
        ) : (
          showEmptyMessage && <p className="text-center text-gray-500">No address data available</p>
        )}
      </CardContent>
    </Card>
  );
}

export function CurrentLocationCard({ userData }: ReviewCardProps) {
  return (
    <LocationCard
      title="Current Address"
      country={userData?.currentCountry}
      locality={userData?.currentLocality}
      neighborhood={userData?.currentNeighborhood}
      userData={userData}
      showEmptyMessage={true}
    />
  );
}

// export function OriginalLocationCard({ userData }: ReviewCardProps) {
//   return (
//     <LocationCard
//       title="العنوان الأصلي"
//       country={userData?.originalCountry}
//       locality={userData?.originalLocality}
//       userData={userData}
//       showEmptyMessage={true}
//     />
//   );
// } 