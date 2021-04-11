import movieRepo from '../repositories/movie.repository.js'

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
        const newMovie = await movieRepo.createMovie(movie)
        return res.status(201).json(newMovie)

    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

export const getMovies = async (req, res) => {
    try {
        const movies = await movieRepo.getMovies()
        return res.status(200).json(movies)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export const getMovie = async (req, res) => {
    return res.status(200).json(res.movie)
}

export const deleteMovie = async (req, res) => {
    try {
        await movieRepo.deleteMovie(res.movie)
        return res.status(204).send()
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export const updateMovie = async (req, res) => {
    try {
        const updatedMovie = await movieRepo.updateMovie(req.body, res.movie)
        return res.status(200).json(updatedMovie)
    } catch (err) {
        return res.status(500).json({ message: err.nessage })
    }
}