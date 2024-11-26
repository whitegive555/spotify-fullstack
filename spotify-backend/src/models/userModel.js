import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  albums: { type: Array, required: true },
  home: { type: Array, required: true }
})

const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel