import dotenv from 'dotenv'
import express from 'express'
import moviesRoutes from './routes/movies.js'
import mongoose from 'mongoose'

dotenv.config()
const PORT = 5000

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    .then(() => console.log('Connected to Database'))
    .catch((err) => console.error(err))

const app = express()

app.use(express.json())
app.use('/api/v1/movies', moviesRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))