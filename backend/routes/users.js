import { Router } from 'express'
import User from '../models/User.js'
import { authMiddleware } from './auth.js'

const router = Router()

router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.find({}, 'username color_in color_out arms created_at').exec()
    res.json(users.map(u => ({ id: u._id, username: u.username, color_in: u.color_in, color_out: u.color_out, arms: u.arms, created_at: u.created_at })))
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id, 'username email color_in color_out arms').exec()
    res.json(user ? ({ id: user._id, username: user.username, email: user.email, color_in: user.color_in, color_out: user.color_out, arms: user.arms }) : null)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id, 'username color_in color_out arms created_at').exec()
    if (!user) return res.status(404).json({ error: 'Not found' })
    res.json({ id: user._id, username: user.username, color_in: user.color_in, color_out: user.color_out, arms: user.arms, created_at: user.created_at })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

router.patch('/me/galaxy', authMiddleware, async (req, res) => {
  try {
    const { color_in, color_out, arms } = req.body
    await User.findByIdAndUpdate(req.user.id, { color_in, color_out, arms }).exec()
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to update galaxy' })
  }
})

export default router
