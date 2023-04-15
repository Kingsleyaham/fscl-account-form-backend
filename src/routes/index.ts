import { upload } from "./../middlewares/fileUpload.middleware";
import { Router } from "express";
import accountRoute from "./account.route";
import { validateIndividualAccount } from "../middlewares/validation.middleware";

const router = Router();

router.use("/account", upload.any(), validateIndividualAccount, accountRoute);

export default router;
