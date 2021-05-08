import movieRepo from '../repositories/movie.repository.js'
import RedisClient from '../redis_init.js'

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
        const { token } = res
        return res.status(201).json({
            movie: newMovie,
            token
        })

    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

export const getMovies = async (req, res) => {
    try {
        const { token } = res
        RedisClient.get('movies', async (err, reply) => {
            if (reply) {
                const movies = JSON.parse(reply)
                console.log('cache resolved')
                return res.status(200).json({ movies, token })
            } else {
                console.log('fetching database...')
                setTimeout(async () => {
                    const movies = await movieRepo.getMovies()
                    RedisClient.set('movies', JSON.stringify(movies));
                    console.log('database resolved')
                    return res.status(200).json({ movies, token })
                }, 5000);
            }
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export const getMovie = async (req, res) => {
    const { movie } = res
    const { token } = res
    return res.status(200).json({
        movie,
        token
    })
}

export const deleteMovie = async (req, res) => {
    try {
        await movieRepo.deleteMovie(res.movie)
        const { token } = res
        return res.status(200).json({
            message: 'movie deleted',
            token
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export const updateMovie = async (req, res) => {
    try {
        const updatedMovie = await movieRepo.updateMovie(req.body, res.movie)
        const { token } = res
        return res.status(200).json({
            movie: updatedMovie,
            token
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}