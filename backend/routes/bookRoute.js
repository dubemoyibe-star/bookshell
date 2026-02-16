import express from 'express'
import upload from '../middleware/upload.js'
import { createBook, deleteBook, getBooks } from '../controllers/bookController.js'
import adminAuth from '../middleware/adminAuth.js'

const bookRouter = express.Router()

bookRouter.post('/', upload.single('image'), adminAuth ,createBook)
bookRouter.get('/', getBooks)
bookRouter.delete('/:id', adminAuth, deleteBook)

export default bookRouter