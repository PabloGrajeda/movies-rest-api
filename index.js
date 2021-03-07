import express from 'express'
import moviesRoutes from './routes/movies.js'

const PORT = 5000
const app = express()

app.use(express.json())
app.use('/movies', moviesRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))