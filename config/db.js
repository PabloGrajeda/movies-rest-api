import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
        console.log('Connected to Database')
    } catch (error) {
        console.error("Database connection failed")
        process.exit(1)
    }
}

export default connectDB