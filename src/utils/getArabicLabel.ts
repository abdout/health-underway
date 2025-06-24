// Utility functions to get Arabic labels for geographic entities.
// Currently returns the input value if no mapping is found.
// You can extend these maps as needed.

const countryMap: Record<string, string> = {
  SD: 'السودان',
  // add more country codes here
};

const localityMap: Record<string, string> = {
  // e.g., 'KH-1': 'الخرطوم',
};

const neighborhoodMap: Record<string, string> = {
  // e.g., 'KH-1-05': 'الصحافة',
};

export function getCountryLabel(code?: string | null): string {
  if (!code) return 'غير محدد';
  return countryMap[code] || code;
}

export function getLocalityLabel(code?: string | null): string {
  if (!code) return 'غير محدد';
  return localityMap[code] || code;
}

export function getNeighborhoodLabel(code?: string | null): string {
  if (!code) return 'غير محدد';
  return neighborhoodMap[code] || code;
} 