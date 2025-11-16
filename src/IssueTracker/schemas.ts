import { z } from "zod";

export const addIssueSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  site: z.string().min(1).optional(),
  severity: z.string(),
  status: z.string(),
});
