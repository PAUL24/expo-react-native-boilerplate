import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  email: z.email(),
  company: z.object({
    name: z.string().min(1),
  }),
});

export type User = z.infer<typeof UserSchema>;
