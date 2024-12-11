import Joi from 'joi';

export const cleanOfficeValidationSchema = Joi.object().keys({
  start: Joi.object()
    .keys({
      x: Joi.number().integer().max(100000).min(-100000).required(),
      y: Joi.number().integer().max(100000).min(-100000).required(),
    })
    .required(),
  commands: Joi.array()
    .max(10000)
    .items(
      Joi.object().keys({
        direction: Joi.string().valid('north', 'south', 'west', 'east').required(),
        steps: Joi.number().positive().max(100000).required(),
      }),
    )
    .required(),
});
