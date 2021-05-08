import dotenv from 'dotenv'
import express from 'express'
import moviesRoutes from './routes/movieRoutes.js'
import authRoutes from './routes/userRoutes.js'
import dbConnection from './config/db.js'
import cors from 'cors'
import RedisClient from './redis_init.js'

dbConnection()
dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())
app.use('/api/v1/movies', moviesRoutes)
app.use('/api/v1/auth', authRoutes)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))