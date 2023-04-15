import { NextFunction, Request, Response } from "express";
import individualAccountSchema from "../schema/individualAccount.schema";

export const validateIndividualAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await individualAccountSchema.validate(
      { ...req.body },
      { abortEarly: false }
    );

    next();
  } catch (err: any) {
    return res.status(401).json({ error: err.errors });
  }
};
