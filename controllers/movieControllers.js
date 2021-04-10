import { movieCreate, movieGetAll, movieDelete, movieUpdate } from '../repositories/movie.repository.js'

export const createMovie = async (req, res) => {
    const movie = {
        title: req.body.title,
        description: req.body.description,
        img: req.body.img,
        stars: req.body.stars,
        director: req.body.director,
        contentType: req.body.contentType
    };
    try {
        const newMovie = await movieCreate(movie)
        res.status(201).json(newMovie)

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export const getMovies = async (req, res) => {
    try {
        const movies = await movieGetAll()
        res.status(200).json(movies)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const getMovie = async (req, res) => {
    res.status(200).json(res.movie)
}

export const deleteMovie = async (req, res) => {
    try {
        await movieDelete(res.movie)
        res.status(204).send()
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const updateMovie = async (req, res) => {
    try {
        const updatedMovie = await movieUpdate(req.body, res.movie)
        res.status(200).json(updatedMovie)
    } catch (err) {
        res.status(500).json({ message: err.nessage })
    }
}