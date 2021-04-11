import MovieModel from '../models/Movie.js'


const createMovie = async (movieData) => {
    const movie = new MovieModel(movieData);
    return await movie.save();
}

const getMovies = async () => {
    const movies = await MovieModel.find()
    return movies
}

const deleteMovie = async (movieModel) => {
    await movieModel.remove()
}

const updateMovie = async (movieData, movieModel) => {
    const { title, description, img, stars, director, contentType } = movieData
    if (title) movieModel.title = title
    if (description) movieModel.description = description
    if (img) movieModel.img = img
    if (stars) movieModel.stars = stars
    if (director) movieModel.director = director
    if (contentType) movieModel.contentType = contentType

    return await movieModel.save()
}

const getMovieMiddleware = async () => {
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

const movieRepo = {
    createMovie,
    getMovies,
    deleteMovie,
    updateMovie,
    getMovieMiddleware
}
export default movieRepo