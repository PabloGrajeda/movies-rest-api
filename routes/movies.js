import express from 'express'
import Movie from '../models/movie.js'
import { createMovie, getMovies, getMovie, deleteMovie, updateMovie } from '../controllers/movies.js'
const router = express.Router()


router.get('/', getMovies)

router.get('/:id', getMovieMiddleware, getMovie)

router.post('/', createMovie)

router.delete('/:id', getMovieMiddleware, deleteMovie)

router.patch('/:id', getMovieMiddleware, updateMovie)


async function getMovieMiddleware(req, res, next) {
    let movie
    try {
        const { id } = req.params
        movie = await Movie.findById(id)
        if (!movie) return res.status(404).json({ message: "Movie not found" })
        res.movie = movie
        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}
export default router;