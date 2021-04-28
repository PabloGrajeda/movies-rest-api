import express from 'express'
import { register, login } from '../controllers/userController.js'
import authRepo from '../repositories/user.repository.js'

const router = express.Router()


router.post('/register', register)
router.post('/login', authRepo.getUser, login)
export default router;