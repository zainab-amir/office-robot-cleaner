import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import joiToJsonSchema from 'joi-to-json';

import Swagger from '@fastify/swagger';
import SwaggerUI from '@fastify/swagger-ui';

/**
 * Plugin to configure Swagger documentation and UI for the application. It is
 * enabled only for non-production environments
 */
async function swagger(fastify: FastifyInstance) {
  await fastify.register(Swagger, {
    openapi: {
      info: {
        title: 'Office Robot Cleaner',
        description: 'API documentation for Office Robot Cleaner Microservice',
        version: '1.0.0',
      },
      servers: [
        {
          url: `http://${fastify.config.API_HOST}:${fastify.config.PORT}`,
        },
      ],
    },
    // In order for swagger to load correct schema for APIs, we need to convert Joi schema to JSON schema
    // Code reference: https://github.com/fastify/fastify-swagger?tab=readme-ov-file#transform
    transform: ({ schema, url }) => {
      const transformedSchema = { ...schema };
      const { params, body, querystring } = schema;

      if (schema.params) transformedSchema.params = joiToJsonSchema(params);
      if (schema.body) transformedSchema.body = joiToJsonSchema(body);
      if (schema.querystring) transformedSchema.querystring = joiToJsonSchema(querystring);

      return { schema: transformedSchema, url };
    },
  });

  // Disable Swagger UI for production
  if (fastify.config.NODE_ENV !== 'production') {
    await fastify.register(SwaggerUI, {
      routePrefix: '/docs',
      uiConfig: {
        docExpansion: 'list',
        deepLinking: false,
      },
    });
  }
}

export default fp(swagger, {
  name: 'swagger',
});
