import { NextFunction, Request, Response } from 'express';
import { DataValidator } from 'body-validator';
import { IValidationSchema } from '../types';

/**
 * Validates the body based on the provided schema.
 * 1. Create a new validation object.
 * 2. Validate the request body.
 * 3. Check if there body is valid and proceed to the next middleware.
 */
export function validate({ schema }: IValidationSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = new DataValidator(schema, req.body);

    validation.Validate();
    const result = validation.ValidationResult;

    if (Object.keys(result).length !== 0) {
      const invalidFields = Object.keys(result).filter(key => key !== 'errors');
      res.send({ message: `Invalid fields: ${invalidFields}` });
    } else {
      next();
    }
  };
}
