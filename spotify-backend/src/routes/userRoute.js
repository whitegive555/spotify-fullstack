import express from 'express'
import { listUser, addUser, updateUser } from '../controllers/userController.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.get('/list', listUser)
userRouter.post('/add', addUser)
userRouter.post('/update', updateUser)

export default userRouter