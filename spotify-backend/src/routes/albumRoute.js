import express from 'express'
import { addAlbum, getAlbum, updateAlbum, deleteAlbum } from '../controllers/albumController.js'
import upload from '../middleware/multer.js'

const albumRouter = express.Router()

albumRouter.post('/add', upload.single('image'), addAlbum)
albumRouter.get('/get', getAlbum)
albumRouter.post('/update', updateAlbum)
albumRouter.post('/delete', deleteAlbum)

export default albumRouter