import authRepo from '../repositories/user.repository.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const register = async (req, res) => {
    try {
        const user = {
            email: req.body.email,
            password: req.body.password,
        }
        await authRepo.register(user)
        return res.status(201).json({ message: "user created" })

    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

export const login = async (req, res) => {
    const user = res.user
    const { password } = req.body

    bcrypt.compare(password, user.password, function (err, result) {
        if (err) return res.status(500).json({ message: "Server Error" })
        if (result) {
            const token = jwt.sign({ email: user.email }, process.env.JWTSECRET, { expiresIn: '2m' })
            return res.status(200).json({ token })
        }
        else
            return res.status(401).json({ message: 'Username or password is not valid' })
    })
}

export const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.JWTSECRET)
        const newToken = jwt.sign({ email: decode.email }, process.env.JWTSECRET, { expiresIn: '2m' })
        res.token = newToken
        next()

    } catch (err) {
        res.status(401).json({ message: 'not authorized' })
    }
}