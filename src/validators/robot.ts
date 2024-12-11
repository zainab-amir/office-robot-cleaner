import Joi from 'joi';

import { COMMAND_LIMIT, STEPS_LIMIT, X_MAX, X_MIN, Y_MAX, Y_MIN } from '../utils/constants';

export const cleanOfficeValidationSchema = Joi.object().keys({
  start: Joi.object()
    .keys({
      x: Joi.number().integer().max(X_MAX).min(X_MIN).required(),
      y: Joi.number().integer().max(Y_MAX).min(Y_MIN).required(),
    })
    .required(),
  commands: Joi.array()
    .max(COMMAND_LIMIT)
    .items(
      Joi.object().keys({
        direction: Joi.string().valid('north', 'south', 'west', 'east').required(),
        steps: Joi.number().positive().max(STEPS_LIMIT).required(),
      }),
    )
    .required(),
});
