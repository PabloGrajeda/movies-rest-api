import Movie from '../models/movie.js'

export const createMovie = async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        description: req.body.description,
        img: req.body.img,
        stars: req.body.stars,
        director: req.body.director,
        contentType: req.body.contentType
    });
    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie)

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find()
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
        await res.movie.remove()
        res.status(204).send()
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const updateMovie = async (req, res) => {
    const { title, description, img, stars, director, contentType } = req.body
    if (title) res.movie.title = title
    if (description) res.movie.description = description
    if (img) res.movie.img = img
    if (stars) res.movie.stars = stars
    if (director) res.movie.director = director
    if (contentType) res.movie.contentType = contentType

    try {
        const updatedMovie = await res.movie.save()
        res.status(200).json(updatedMovie)
    } catch (err) {
        res.status(500).json({ message: err.nessage })
    }
}
