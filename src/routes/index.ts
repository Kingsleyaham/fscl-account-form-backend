import { upload } from "./../middlewares/fileUpload.middleware";
import { Router } from "express";
import accountRoute from "./account.route";

const router = Router();

router.use("/account", upload.any(), accountRoute);

export default router;
