import { celebrate, Segments, Joi as celebrateJoi } from 'celebrate';
import Joi from 'joi';

const celebrateOptions: Joi.ValidationOptions = {
  abortEarly: false,
  allowUnknown: true
};

export const createURLRoutesValidation = () =>
  celebrate(
    {
      [Segments.BODY]: celebrateJoi.object().keys({
        originalUrl: celebrateJoi.string().trim().uri().required()
      }),
      [Segments.QUERY]: {
        token: celebrateJoi.string()
      }
    },
    celebrateOptions
  );
