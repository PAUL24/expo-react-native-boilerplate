import { z } from 'zod';

const envSchema = z.object({
  apiUrl: z.url().default('https://jsonplaceholder.typicode.com'),
  appEnv: z.enum(['development', 'preview', 'production', 'test']).default('development'),
});

export const env = envSchema.parse({
  apiUrl: process.env.EXPO_PUBLIC_API_URL,
  appEnv: process.env.EXPO_PUBLIC_APP_ENV,
});

export type AppEnvironment = z.infer<typeof envSchema>['appEnv'];
