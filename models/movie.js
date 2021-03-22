import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    stars: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
})
const movieModel = mongoose.model('Movie', movieSchema)
export default movieModel