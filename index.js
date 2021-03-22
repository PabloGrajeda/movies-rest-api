import express from 'express'
import moviesRoutes from './routes/movies.js'
import mongoose from 'mongoose'

const PORT = 5000
const DATABASE_URL = 'mongodb://localhost:27017/movies-mern'


mongoose.connect(DATABASE_URL, { useNewUrlParser: true })
    .then(() => console.log('Connected to Database'))
    .catch((err) => console.error(err))

const app = express()

app.use(express.json())
app.use('/api/v1/movies', moviesRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))