let movies = []
let ids = 0

export const createMovie = (req, res) => {
    const movie = { id: ids++, ...req.body };
    movies.push(movie)
    res.send(movies)
}

export const getMovies = (req, res) => {
    res.send(movies)
}

export const getMovie = (req, res) => {
    const { id } = req.params
    const movie = movies.find(movie => movie.id == id)
    if (movie) res.send(movie)
    else res.send({ response: "not found" })
}

export const deleteMovie = (req, res) => {
    const { id } = req.params
    movies = movies.filter(movie => movie.id != id)
    res.send(movies)
}

export const updateMovie = (req, res) => {
    const { id } = req.params
    const { title, description, img, stars, director, contentType } = req.body
    let movie = movies.find(movie => movie.id == id)

    if (title) movie.title = title
    if (description) movie.description = description
    if (img) movie.img = img
    if (stars) movie.stars = stars
    if (director) movie.director = director
    if (contentType) movie.contentType = contentType

    res.send(movie)

}