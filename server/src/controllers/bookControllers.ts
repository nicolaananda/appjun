import { Request, Response } from "express";
import { Book } from "../models/bookSchema";

export const bookController = {
  getData: async (req: Request, res: Response) => {
    try {
      const { search } = req.query;

      const CLAUSES = search
        ? {
            $or: [
              { name: { $regex: search as string, $options: "i" } },
              { description: { $regex: search as string, $options: "i" } },
              { author: { $regex: search as string, $options: "i" } },
            ],
          }
        : {};

      const allBooks = await Book.find(CLAUSES);
      return res.json(allBooks);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching books", error });
    }
  },

  createData: async (req: Request, res: Response) => {
    try {
      const { name, description, isbn, author } = req.body;

      if (!name || !description || !isbn || !author) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const createBook = new Book({
        name,
        description,
        isbn,
        author,
        file: req.file?.originalname,
        isAvailable: true,
      });

      const saved = await createBook.save();
      return res.json({ message: "Book created", data: saved });
    } catch (error) {
      return res.status(500).json({ message: "Error creating book", error });
    }
  },

  getSingleData: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const book = await Book.findById(id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.json(book);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching book", error });
    }
  },

  updateData: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const updateBook = await Book.findByIdAndUpdate(
        id,
        {
          isAvailable: false,
          borrowedAt: new Date(),
        },
        { new: true }
      );

      if (!updateBook) {
        return res.status(404).json({ message: "Book not found" });
      }

      return res.json({ message: "Book updated", data: updateBook });
    } catch (error) {
      return res.status(500).json({ message: "Error updating book", error });
    }
  },
  returnData: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const updateBook = await Book.findByIdAndUpdate(
        id,
        {
          isAvailable: true,
          borrowedAt: new Date(),
        },
        { new: true }
      );

      if (!updateBook) {
        return res.status(404).json({ message: "Book not found" });
      }

      return res.json({ message: "Book updated", data: updateBook });
    } catch (error) {
      return res.status(500).json({ message: "Error updating book", error });
    }
  },
};
