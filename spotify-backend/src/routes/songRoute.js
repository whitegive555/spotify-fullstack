import { addSong, getAllSongs, deleteSong } from '../controllers/songController.js'
import express from 'express'
import upload from '../middleware/multer.js'

const songRouter = express.Router()

songRouter.post('/add', upload.fields([
  { name: 'artwork', maxCount: 1 },
  { name: 'audio', maxCount: 1 }
]), addSong)
songRouter.get('/getAll', getAllSongs)
songRouter.post('/delete', deleteSong)

export default songRouter