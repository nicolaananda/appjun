import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { bookRouter } from "./routes/bookRouter";
import { authRouter } from "./routes/authRouter";
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL!)
  .then(() => console.log("connected to mongo"))
  .catch(() => console.error("Monggo connection error"));

const app = express();

app.use(express.json()); //read json
app.use(express.urlencoded({ extended: true })); //read formData
app.use(express.static("public"));
app.use(cors({ origin: ["http://localhost:5173"] }));
app.use("/books", bookRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => res.json({ message: "Hello World!" }));

app.listen(8080, "0.0.0.0", () => {
  console.log("Server running at http://localhost:8080");
});
