import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = Router()
const SECRET = process.env.JWT_SECRET || 'galaxy-secret-change-in-prod'

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token' })
  try {
    req.user = jwt.verify(token, SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

const PALETTE = [
  ['#ffa575','#6a1599'], ['#70a1ff','#2c3e6b'], ['#ff6b6b','#6b1a1a'],
  ['#55efc4','#1a4a3a'], ['#fd79a8','#6b1a3a'], ['#fdcb6e','#6b4a1a'],
  ['#a29bfe','#3a2c6b'], ['#00cec9','#1a4a4a'], ['#e17055','#6b2c1a']
]

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password)
    return res.status(400).json({ error: 'All fields required' })
  try {
    const hash = await bcrypt.hash(password, 10)
    const pair = PALETTE[Math.floor(Math.random() * PALETTE.length)]
    const arms = [2,3,4,5][Math.floor(Math.random()*4)]
    const user = await User.create({
      username, email, password: hash, color_in: pair[0], color_out: pair[1], arms
    })
    const token = jwt.sign({ id: user._id, username: user.username }, SECRET, { expiresIn: '7d' })
    res.json({ token, userId: user._id })
  } catch (e) {
    res.status(400).json({ error: 'Username or email already taken' })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email }).exec()
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ error: 'Invalid credentials' })
    const token = jwt.sign({ id: user._id, username: user.username }, SECRET, { expiresIn: '7d' })
    res.json({ token, userId: user._id })
  } catch (e) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
