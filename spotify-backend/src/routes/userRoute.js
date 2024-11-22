import express from 'express'
import { addUser, getUser, updateUser } from '../controllers/userController.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.post('/add', addUser)
userRouter.get('/get', getUser)
userRouter.post('/update', updateUser)

export default userRouter