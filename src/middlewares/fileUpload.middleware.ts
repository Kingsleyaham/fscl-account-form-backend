import { NextFunction, Request, Response } from "express";
import multer from "multer";

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("only .png, .jpg and .jpeg format allowed"));
  }
};

const fileName = (req: Request, file: Express.Multer.File, cb: any) => {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const ext = file.mimetype.split("/")[1];
  cb(null, `${file.fieldname.replace("[]", "")}-${uniqueSuffix}.${ext}`);
};

const storage = multer.diskStorage({
  destination: "./src/assets/uploads",
  filename: fileName,
});

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 },
});
