import { accountService } from "./../services/account.service";
import { Request, Response } from "express";

class AccountController {
  async createIndividual(req: Request, res: Response) {
    try {
      const user = await accountService.createIndividualAccount(
        req.body,
        req.files
      );
      // res.json({ ...req.files });

      res.status(201).json({ sucess: true, user });
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }

    // res.json({ ...req.file });
  }
}

export const accountController = new AccountController();
