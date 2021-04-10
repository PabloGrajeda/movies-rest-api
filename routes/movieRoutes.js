import express from 'express'
import { createMovie, getMovies, getMovie, deleteMovie, updateMovie } from '../controllers/movieControllers.js'
import movieRepo from '../repositories/movie.repository.js'
const router = express.Router()


router.post('/', createMovie)

router.get('/', getMovies)

router.get('/:id', movieRepo.getMovieMiddleware, getMovie)

router.delete('/:id', movieRepo.getMovieMiddleware, deleteMovie)

router.patch('/:id', movieRepo.getMovieMiddleware, updateMovie)

export default router;