import { Router } from "express";
import { accountController } from "../controllers/account.controller";

const router = Router();

router.post("/individual", accountController.createIndividual);

export default router;
