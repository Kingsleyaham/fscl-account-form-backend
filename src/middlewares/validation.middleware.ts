import { NextFunction, Request, Response } from "express";
import individualAccountSchema from "../schema/individualAccount.schema";
import corporateAccountSchema from "../schema/corporateAccount.schema";
import jointAccountSchema from "../schema/jointAccount.schema";

export const validateIndividualAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await individualAccountSchema.validate({ ...req.body }, { abortEarly: false });

    next();
  } catch (err: any) {
    return res.status(401).json({ error: err.errors });
  }
};

export const validateJointAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await jointAccountSchema.validate({ ...req.body }, { abortEarly: false });

    next();
  } catch (err: any) {
    return res.status(401).json({ error: err.errors });
  }
};
export const validateCorporateAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await corporateAccountSchema.validate({ ...req.body }, { abortEarly: false });

    next();
  } catch (err: any) {
    return res.status(401).json({ error: err.errors });
  }
};
