import { z } from 'zod';

// Define the schema for form validation
export const activitySchema = z.object({
  selectedActivities: z.array(z.string()),
  partyMember: z.boolean().optional().default(false),
  partyName: z.string().optional(),
  partyStartDate: z.string().optional(),
  partyEndDate: z.string().optional(),
  unionMember: z.boolean().optional().default(false),
  unionName: z.string().optional(),
  unionStartDate: z.string().optional(),
  unionEndDate: z.string().optional(),
  ngoMember: z.boolean().optional().default(false),
  ngoName: z.string().optional(),
  ngoActivity: z.string().optional(),
  clubMember: z.boolean().optional().default(false),
  clubName: z.string().optional(),
  clubType: z.string().optional(),
  voluntaryMember: z.boolean().optional().default(false),
  voluntaryName: z.string().optional(),
  voluntaryRole: z.string().optional(),
  voluntaryStartDate: z.string().optional(),
  voluntaryEndDate: z.string().optional(),
  skills: z.array(z.string()),
  interests: z.array(z.string()),
});

// Export the inferred type from the schema
export type ActivitySchema = z.infer<typeof activitySchema>;
