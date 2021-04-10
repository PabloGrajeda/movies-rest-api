import MovieModel from '../models/Movie.js'


export const movieCreate = async (movieData) => {
    const movie = new MovieModel(movieData);
    return await movie.save();
}

export const movieGetAll = async () => {
    const movies = await MovieModel.find()
    return movies
}

export const movieDelete = async (movieModel) => {
    await movieModel.remove()
}

export const movieUpdate = async (movieData, movieModel) => {
    const { title, description, img, stars, director, contentType } = movieData
    if (title) movieModel.title = title
    if (description) movieModel.description = description
    if (img) movieModel.img = img
    if (stars) movieModel.stars = stars
    if (director) movieModel.director = director
    if (contentType) movieModel.contentType = contentType

    return await movieModel.save()
}

export async function getMovieMiddleware(req, res, next) {
    let movie
    try {
        const { id } = req.params
        movie = await MovieModel.findById(id)
        if (!movie) return res.status(404).json({ message: "Movie not found" })
        res.movie = movie
        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}