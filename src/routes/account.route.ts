import { Router } from "express";
import { accountController } from "../controllers/account.controller";
import {
  validateCorporateAccount,
  validateIndividualAccount,
  validateJointAccount,
} from "../middlewares/validation.middleware";

const router = Router();

router.post("/individual", validateIndividualAccount, accountController.createIndividualAccount);
router.post("/joint", validateJointAccount, accountController.createJointAccount);
router.post("/corporate", validateCorporateAccount, accountController.createCorporateAccount);

export default router;
