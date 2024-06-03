import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  name: String,
  description: String,
  isbn: String,
  author: String,
  file: String,
  isAvailable: { type: Boolean, default: true },
  borrowedAt: { type: Date },
});

export const Book = model("book", bookSchema);
