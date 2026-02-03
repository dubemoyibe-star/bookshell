import Book from "../models/bookModel.js";
import path from "path";
import fs from "fs";

export const createBook = async (req, res, next) => {
  try {
    const filename = req.file?.filename ?? null;
    const imagePath = filename ? `/uploads/${filename}` : null;
    const {title, author, price, rating, category, description} = req.body;
    const book = new Book({
      title,
      author,
      price,
      rating,
      category,
      description,
      image: imagePath
    })
    const saved = await book.save();
    res.status(201).json(saved)
  } catch (err) {
    next(err)
  }
}


export const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find().sort({ createdAt: -1})
    res.json(books)
  } catch (err) {
    next(err)
  }
}

export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id)
    if(!book) {
      res.status(404).json({ message: 'Book not found'})
    }

    if(book.image) {
      const filepath = path.join(process.cwd(), book.image)
      fs.unlink(filepath, (err) => {
        if (err) console.warn('failed to delete the image')
      })
    }
    res.json({ message: 'Book deleted successfully'})
  } catch (err) {
    next(err)
  }
}