import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  target: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text:   { type: String, required: true, maxlength: 120 },
  planet_slot: { type: Number, required: true },
  created_at: { type: Date, default: () => new Date() }
})

CommentSchema.index({ author: 1, target: 1, planet_slot: 1 }, { unique: true })

export default mongoose.model('Comment', CommentSchema)
