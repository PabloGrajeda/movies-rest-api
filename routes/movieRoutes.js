import express from 'express'
import { createMovie, getMovies, getMovie, deleteMovie, updateMovie, getMovieMiddleware} from '../controllers/movieControllers.js'
const router = express.Router()


router.get('/', getMovies)

router.get('/:id', getMovieMiddleware, getMovie)

router.post('/', createMovie)

router.delete('/:id', getMovieMiddleware, deleteMovie)

router.patch('/:id', getMovieMiddleware, updateMovie)

export default router;