import { Request, Response, NextFunction } from "express";
import * as Yup from "yup";

export const validateSchema = <T extends Record<string, any>>(
  schema: Yup.ObjectSchema<T>
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      //Validate request body

      const validateData = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      req.body = validateData;
      next();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = error.inner.map((err) => ({
          field: err.path,
          message: err.message,
        }));
        res.status(400).json({
          success: false,
          message: "validation failed",
          errors: errors,
        });
        return;
      }
    }
  };
};
