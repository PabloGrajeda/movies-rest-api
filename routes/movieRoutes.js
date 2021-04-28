import express from 'express'
import { createMovie, getMovies, getMovie, deleteMovie, updateMovie } from '../controllers/movieControllers.js'
import movieRepo from '../repositories/movie.repository.js'
import { authenticate } from '../controllers/userController.js'
const router = express.Router()


router.post('/', authenticate, createMovie)

router.get('/', authenticate, getMovies)

router.get('/:id', authenticate, movieRepo.getMovieMiddleware, getMovie)

router.delete('/:id', authenticate, movieRepo.getMovieMiddleware, deleteMovie)

router.patch('/:id', authenticate, movieRepo.getMovieMiddleware, updateMovie)

export default router;