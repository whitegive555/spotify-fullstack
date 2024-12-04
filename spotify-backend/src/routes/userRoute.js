import express from 'express'
import { addUser, getUser, getMoreHomeContent, updateUser } from '../controllers/userController.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.post('/add', addUser)
userRouter.get('/get/:id', getUser)
userRouter.get('/getMoreHomeContent', getMoreHomeContent)
userRouter.post('/update/:id/:field', updateUser)

export default userRouter