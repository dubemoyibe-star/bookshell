import express from 'express'
import upload from '../middleware/upload.js'
import { createBook, deleteBook, getBooks } from '../controllers/bookController.js'

const bookRouter = express.Router()

bookRouter.post('/', upload.single('image'), createBook)
bookRouter.get('/', getBooks)
bookRouter.delete('/:id', deleteBook)

export default bookRouter