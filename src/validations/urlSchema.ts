import { Segments, Joi, SchemaOptions } from 'celebrate';

export const createUrlSchema: SchemaOptions = {
  [Segments.BODY]: Joi.object().keys({
    originalUrl: Joi.string().trim().uri().required()
  })
};

export const deleteUrlSchema: SchemaOptions = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
};
