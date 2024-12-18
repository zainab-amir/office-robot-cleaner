import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';
import fromZodSchema from 'zod-to-json-schema';

const convertToStringsArray = (value: string) => {
  if (!value || value === '') {
    return null;
  }
  return value.split(',');
};

const appEnvSchema = z.object({
  ALLOWED_DOMAINS: z.string().transform(convertToStringsArray).default('*').describe('List of allowed CORS origins'),
  API_HOST: z.string().default('127.0.0.1'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  HOST: z.string().default('127.0.0.1'),
  PORT: z.coerce.number().default(5000),
  DB_CLIENT: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number().default(5432),
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
  if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: path.join(projectRoot, '.env.test'), override: true });
  } else if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: path.join(projectRoot, '.env.local'), override: true });
  }
  if (process.env.LOAD_DOCKER_ENV === 'true') {
    dotenv.config({ path: path.join(projectRoot, '.env.docker'), override: true });
  }

  const result = appEnvSchema.safeParse(process.env);
  if (!result.success) {
    throw new Error(`Invalid environment variables: ${JSON.stringify(result.error)}`);
  }

  return result.data;
}
