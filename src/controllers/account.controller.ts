import { accountService } from "./../services/account.service";
import { Request, Response } from "express";

class AccountController {
  async createIndividualAccount(req: Request, res: Response) {
    try {
      const user = await accountService.createIndividualAccount(req.body, req.files);

      res.status(201).json({ sucess: true, user });
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }

  async createJointAccount(req: Request, res: Response) {
    try {
      const user = await accountService.createJointAccount(req.body, req.files);

      res.status(201).json({ sucess: true, user });
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }
  async createCorporateAccount(req: Request, res: Response) {
    try {
      const user = await accountService.createCorporateAccount(req.body, req.files);

      res.status(201).json({ sucess: true, user });
      // console.log(req.body);
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  }
}

export const accountController = new AccountController();
