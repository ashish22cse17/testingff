import { Router } from 'express'
import Friendship from '../models/Friendship.js'
import User from '../models/User.js'
import { authMiddleware } from './auth.js'

const router = Router()

router.get('/', authMiddleware, async (req, res) => {
  try {
    const uid = req.user.id
    const rows = await Friendship.find({ $or: [{ from: uid }, { to: uid }] })
      .populate('from', 'username color_in color_out arms')
      .populate('to', 'username color_in color_out arms')
      .exec()

    const out = rows.map(f => {
      const other = String(f.from._id) === String(uid) ? f.to : f.from
      return { id: other._id, username: other.username, color_in: other.color_in, color_out: other.color_out, arms: other.arms, status: f.status, from_id: f.from._id }
    })
    res.json(out)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch friends' })
  }
})

router.post('/request/:toId', authMiddleware, async (req, res) => {
  try {
    const toId = req.params.toId
    const uid = req.user.id
    if (toId === uid) return res.status(400).json({ error: 'Cannot add yourself' })

    const existing = await Friendship.findOne({ $or: [{ from: uid, to: toId }, { from: toId, to: uid }] }).exec()
    if (existing) return res.status(400).json({ error: 'Already exists' })

    const acceptedCount = await Friendship.countDocuments({ $or: [{ from: uid }, { to: uid }], status: 'accepted' }).exec()
    if (acceptedCount >= 7) return res.status(400).json({ error: 'Max 7 friends reached' })

    await Friendship.create({ from: uid, to: toId, status: 'pending' })
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to send request' })
  }
})

router.patch('/accept/:fromId', authMiddleware, async (req, res) => {
  try {
    const uid = req.user.id
    const fromId = req.params.fromId
    const acceptedCount = await Friendship.countDocuments({ $or: [{ from: uid }, { to: uid }], status: 'accepted' }).exec()
    if (acceptedCount >= 7) return res.status(400).json({ error: 'Max 7 friends reached' })

    await Friendship.findOneAndUpdate({ from: fromId, to: uid }, { status: 'accepted' }).exec()
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to accept request' })
  }
})

router.delete('/:otherId', authMiddleware, async (req, res) => {
  try {
    const uid = req.user.id
    const oid = req.params.otherId
    await Friendship.deleteOne({ $or: [{ from: uid, to: oid }, { from: oid, to: uid }] }).exec()
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete friend' })
  }
})

export default router
