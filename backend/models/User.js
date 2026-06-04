import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  color_in: { type: String, default: '#ffa575' },
  color_out:{ type: String, default: '#6a1599' },
  arms:     { type: Number, default: 4 },
  created_at: { type: Date, default: () => new Date() }
})

export default mongoose.model('User', UserSchema)
