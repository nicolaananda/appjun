import express from "express";
import { bookController } from "../controllers/bookControllers";
import multer, { StorageEngine } from "multer";

const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

export const bookRouter = express.Router();

bookRouter.get("/", bookController.getData);
bookRouter.get("/:id", bookController.getSingleData);
bookRouter.patch("/:id", bookController.updateData);
bookRouter.patch("/:id/return", bookController.returnData);

bookRouter.post("/", upload.single("file"), bookController.createData);
