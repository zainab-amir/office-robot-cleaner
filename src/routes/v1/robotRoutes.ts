import { FastifyInstance } from 'fastify';

import { cleanOfficeHandler } from '../../controllers/v1/robotController';
import { cleanOfficeValidationSchema } from '../../validators/robot';

module.exports = async function (fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/enter-path',
    schema: {
      description:
        'The API simulates a robot moving in a grid office space. Robot moves from one vertex to another ' +
        'based on the commands provided as request body. After cleaning has been done, the robot reports ' +
        'the number of unique places (vertices) cleaned.',
      body: cleanOfficeValidationSchema,
      response: {
        200: { $ref: 'ExecutionResponse#' },
        400: { $ref: 'ErrorResponse#' },
        500: { $ref: 'ErrorResponse#' },
      },
    },
    validatorCompiler: ({ schema }: any) => {
      return (data) => schema.validate(data);
    },
    handler: cleanOfficeHandler,
  });
};
