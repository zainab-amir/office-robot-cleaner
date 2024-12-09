import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';
import fromZodSchema from 'zod-to-json-schema';

const appEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  HOST: z.string().default('localhost'),
  PORT: z.coerce.number().default(5000),
  DB_CLIENT: z.string(),
  DB_HOST: z.string(),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_POOL_MIN: z.coerce.number().default(3),
  DB_POOL_MAX: z.coerce.number().default(7),
});

// JSON schema for fastify
export const appEnvConfig = {
  type: 'object',
  ...fromZodSchema(appEnvSchema),
};

// Type inferred from the zod schema
export type AppEnvConfig = z.infer<typeof appEnvSchema>;

// This can be used to expose the configs to scripts that live outside the fastify instance
export function loadEnv(): AppEnvConfig {
  const projectRoot = path.join(__dirname, '..');

  // Load .env from project root
  dotenv.config({
    path: path.join(projectRoot, '.env'),
  });
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: path.join(projectRoot, '.env.local'), override: true });
  }

  const result = appEnvSchema.safeParse(process.env);
  if (!result.success) {
    throw new Error('Invalid environment variables');
  }

  return result.data;
}
