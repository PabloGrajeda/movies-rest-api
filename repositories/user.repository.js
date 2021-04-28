import userModel from '../models/User.js'
import bcrypt from 'bcryptjs'

const register = async (userInfo) => {
    bcrypt.hash(userInfo.password, 10, async function (err, hash) {
        if (err) return err

        userInfo.password = hash
        const user = new userModel(userInfo)
        return await user.save()
    })
}
const getUser = async (req, res, next) => {
    let user
    try {
        const { email } = req.body
        user = await userModel.findOne({ email })
        if (!user) return res.status(404).json({ message: "User doesn't exist" })
        res.user = user
        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

const userRepo = {
    register,
    getUser
}
export default userRepo