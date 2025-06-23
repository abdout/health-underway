export const ATTACHMENT_FIELDS = [
  { name: 'image' as const, label: 'Picture', type: 'image' },
  { name: 'cv' as const, label: 'Resume', type: 'raw' },
  // { name: 'portfolio' as const, label: 'Portfolio', type: 'raw' },
  // { name: 'additionalFile' as const, label: 'Additional File', type: 'raw' },
] as const; 