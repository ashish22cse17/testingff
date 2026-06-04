import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import usersRoutes from './routes/users.js'
import friendsRoutes from './routes/friends.js'
import commentsRoutes from './routes/comments.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/galaxy'

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/friends', friendsRoutes)
app.use('/api/comments', commentsRoutes)

mongoose.connect(MONGO_URI, { dbName: 'galaxy' })
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Galaxy server running on :${PORT}`))
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err)
    process.exit(1)
  })
