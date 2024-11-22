import express from 'express'
import { addAlbum, getAlbum, getAllAlbums, updateAlbum, deleteAlbum } from '../controllers/albumController.js'
import upload from '../middleware/multer.js'

const albumRouter = express.Router()

albumRouter.post('/add', upload.single('artwork'), addAlbum)
albumRouter.get('/get', getAlbum)
albumRouter.get('/getAll', getAllAlbums)
albumRouter.post('/update', updateAlbum)
albumRouter.post('/delete', deleteAlbum)

export default albumRouter