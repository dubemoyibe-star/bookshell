import Book from "../models/bookModel.js";
import { v2 as cloudinary } from 'cloudinary';
import { logActivity } from "../utils/logActivity.js";


export const createBook = async (req, res, next) => {
  try {
    const {title, author, price, rating, category, description} = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const book = new Book({
      title,
      author,
      price,
      rating,
      category,
      description,
      image: {
        url: req.file.path,
        public_id: req.file.filename
      }
    })
    const saved = await book.save();

  await logActivity({
    adminId: req.admin._id,
    action: 'ADDED BOOK',
    entityType: 'book',
    entityId: book._id,
    details: {
      adminName: req.admin.name,
      adminEmail: req.admin.email,
      title: saved.title,
      author: saved.author,
      price: saved.price,
      image: saved.image.url
    }
  })

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

    if (book.image?.public_id) {
      await cloudinary.uploader.destroy(book.image.public_id);
    }

     await logActivity({
    adminId: req.admin._id,
    action: 'DELETED BOOK',
    entityType: 'book',
    entityId: book._id,
    details: {
      adminName: req.admin.name,
      adminEmail: req.admin.email,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image.url
    }
  })
    res.json({ message: 'Book deleted successfully'})
  } catch (err) {
    next(err)
  }
}