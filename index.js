import dotenv from 'dotenv'
import express from 'express'
import moviesRoutes from './routes/movieRoutes.js'
import dbConnection from './config/db.js'

dbConnection()
dotenv.config()

const app = express()

app.use(express.json())
app.use('/api/v1/movies', moviesRoutes)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))