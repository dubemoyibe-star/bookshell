import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import path from 'path'
import { fileURLToPath } from 'url';
import bookRouter from './routes/bookRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//middleware
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [ process.env.FRONTEND_URL, process.env.ADMIN_URL];
    if(!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    }else{
      callback(new Error('Not allowed by cors'))
    }
  },
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//db
connectDB()

//routes
app.use('/api/user', userRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/book', bookRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/' , (req, res) => {
  res.send('API IS WORKING')
})

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})