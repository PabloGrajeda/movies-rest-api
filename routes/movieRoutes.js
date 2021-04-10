import express from 'express'
import { createMovie, getMovies, getMovie, deleteMovie, updateMovie } from '../controllers/movieControllers.js'
import { getMovieMiddleware } from '../repositories/movie.repository.js'
const router = express.Router()


router.post('/', createMovie)

router.get('/', getMovies)

router.get('/:id', getMovieMiddleware, getMovie)

router.delete('/:id', getMovieMiddleware, deleteMovie)

router.patch('/:id', getMovieMiddleware, updateMovie)

export default router;