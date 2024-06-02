import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  name: String,
  description: String,
  isbn: String,
  author: String,
  file: String,
  isAvailable: { type: Boolean, default: true },
  borrowedBy: { type: String, default: null }, // Add this field
});

export const Book = model("book", bookSchema);
