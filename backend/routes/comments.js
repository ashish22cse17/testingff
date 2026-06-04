import { Router } from 'express'
import Comment from '../models/Comment.js'
import { authMiddleware } from './auth.js'

const router = Router()

router.get('/:targetId', authMiddleware, async (req, res) => {
  try {
    const rows = await Comment.find({ target: req.params.targetId })
      .populate('author', 'username color_in')
      .sort('planet_slot')
      .exec()
    const out = rows.map(c => ({ id: c._id, author_id: c.author._id, text: c.text, planet_slot: c.planet_slot, created_at: c.created_at, username: c.author.username, color_in: c.author.color_in }))
    res.json(out)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' })
  }
})

router.post('/:targetId', authMiddleware, async (req, res) => {
  const { text, planet_slot } = req.body
  if (!text || planet_slot === undefined) return res.status(400).json({ error: 'text and planet_slot required' })
  if (text.length > 120) return res.status(400).json({ error: 'Max 120 characters' })
  if (String(req.user.id) === String(req.params.targetId)) return res.status(400).json({ error: 'Cannot post comment to yourself' })

  try {
    await Comment.create({ author: req.user.id, target: req.params.targetId, text, planet_slot })
    res.json({ ok: true })
  } catch (e) {
    res.status(400).json({ error: 'Slot already taken' })
  }
})

router.delete('/:commentId', authMiddleware, async (req, res) => {
  try {
    const c = await Comment.findById(req.params.commentId).exec()
    if (!c) return res.json({ ok: true })
    if (String(c.author) !== String(req.user.id) && String(c.target) !== String(req.user.id)) {
      return res.status(403).json({ error: 'Not allowed' })
    }
    await Comment.deleteOne({ _id: req.params.commentId }).exec()
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete comment' })
  }
})

export default router
