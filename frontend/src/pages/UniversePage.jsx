import React, { useRef, useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store.js'
import { api } from '../api.js'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as NodeModules from 'three/examples/jsm/nodes/Nodes.js'
import WebGPURenderer from 'three/examples/jsm/renderers/webgpu/WebGPURenderer.js'
import { buildGalaxy } from '../galaxyData.js'

const { uniform } = NodeModules

export default function UniversePage() {
  const { allUsers, me, friends, setFriends } = useStore()
  const navigate   = useNavigate()
  const mountRef   = useRef(null)
  const usersRef   = useRef([])
  const meRef      = useRef(null)
  const friendsRef = useRef([])
  const sceneRef   = useRef(null)   // { galaxyMeshes: [{mesh, user}] }
  const [tooltip, setTooltip] = useState({ text: '', x: 0, y: 0 })
  const navigateRef = useRef(navigate)

  useEffect(() => { usersRef.current   = allUsers },  [allUsers])
  useEffect(() => { meRef.current      = me        }, [me])
  useEffect(() => { friendsRef.current = friends   }, [friends])
  useEffect(() => { navigateRef.current = navigate }, [navigate])

  useEffect(() => {
    if (!sceneRef.current || !allUsers.length) return
    const { scene, timeUniform, galaxyObjects, labelGroup } = sceneRef.current

    galaxyObjects.forEach(o => { scene.remove(o.mesh); scene.remove(o.label) })
    galaxyObjects.length = 0
    while (labelGroup.children.length) labelGroup.remove(labelGroup.children[0])

    buildGalaxyMeshes(scene, timeUniform, galaxyObjects, allUsers, me)
  }, [allUsers, me])

  function buildGalaxyMeshes(scene, timeUniform, galaxyObjects, users, currentMe) {
    const count = users.length
    if (!count) return

    const cols  = Math.min(count, 3)
    const rows  = Math.ceil(count / cols)
    const spacX = 16
    const spacZ = 14

    users.forEach((u, i) => {
      const col = i % cols
      const row = Math.floor(i / cols)
      const cx  = (col - (cols - 1) / 2) * spacX
      const cz  = (row - (rows - 1) / 2) * spacZ

      const def = {
        key:          `user-${u.id}`,
        name:         u.username,
        type:         'spiral',
        arms:         u.arms || 4,
        count:        2500,
        radius:       4.5,
        scaleMin:     0.001,
        scaleMax:     0.07,
        colorInside:  u.color_in  || '#ffa575',
        colorOutside: u.color_out || '#6a1599',
        randomMul:    1.0,
        position:     new THREE.Vector3(cx, 0, cz),
        rotation:     new THREE.Euler(0, 0, 0),
      }

      const { mesh } = buildGalaxy(def, timeUniform, 5, NodeModules)
      scene.add(mesh)

      const hitMesh = new THREE.Mesh(
        new THREE.SphereGeometry(3.5, 8, 8),
        new THREE.MeshBasicMaterial({ visible: false })
      )
      hitMesh.position.set(cx, 0, cz)
      hitMesh.userData = { user: u, cx, cz }
      scene.add(hitMesh)

      const lc = document.createElement('canvas')
      lc.width = 512; lc.height = 96
      const lctx = lc.getContext('2d')
      lctx.font = '500 28px Orbitron, monospace'
      lctx.fillStyle = u.color_in || '#ffa575'
      lctx.textAlign = 'center'
      lctx.textBaseline = 'middle'
      lctx.fillText(u.username, 256, 38)
      if (u.id === currentMe?.id) {
        lctx.font = '400 18px Orbitron, monospace'
        lctx.fillStyle = u.color_in || '#ffa575'
        lctx.globalAlpha = 0.65
        lctx.fillText('YOUR GALAXY', 256, 68)
      }
      const label = new THREE.Sprite(new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(lc),
        transparent: true, depthWrite: false, opacity: 0.9
      }))
      label.scale.set(5.5, 1.0, 1)
      label.position.set(cx, -5.5, cz)
      scene.add(label)

      galaxyObjects.push({ mesh, hitMesh, label, user: u, cx, cz })
    })
  }

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    let renderer, animId

    async function init() {
      renderer = new WebGPURenderer({ antialias: true })
      await renderer.init()
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor('#000008')
      el.appendChild(renderer.domElement)

      const W = el.clientWidth, H = el.clientHeight
      renderer.setSize(W, H)

      const scene  = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, W / H, 0.01, 2000)
      camera.position.set(0, 22, 30)

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping   = true
      controls.dampingFactor   = 0.05
      controls.target.set(0, 0, 0)
      controls.maxDistance     = 120
      controls.minDistance     = 5
      controls.autoRotate      = true
      controls.autoRotateSpeed = 0.15
      controls.update()

      const bgCount = 15000
      const bgPos   = new Float32Array(bgCount * 3)
      const bgCol   = new Float32Array(bgCount * 3)
      const sCols   = [[1,0.95,0.85],[0.85,0.9,1],[1,0.8,0.7],[0.9,1,0.9],[1,1,1]]
      for (let i = 0; i < bgCount; i++) {
        const theta = Math.random() * Math.PI * 2
        const phi   = Math.acos(2 * Math.random() - 1)
        const r     = 900 + Math.random() * 100
        bgPos[i*3]   = r * Math.sin(phi) * Math.cos(theta)
        bgPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
        bgPos[i*3+2] = r * Math.cos(phi)
        const sc = sCols[Math.floor(Math.random() * sCols.length)]
        const b  = 0.5 + Math.random() * 0.5
        bgCol[i*3] = sc[0]*b; bgCol[i*3+1] = sc[1]*b; bgCol[i*3+2] = sc[2]*b
      }
      const bgGeo = new THREE.BufferGeometry()
      bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3))
      bgGeo.setAttribute('color',    new THREE.BufferAttribute(bgCol, 3))
      scene.add(new THREE.Points(bgGeo, new THREE.PointsMaterial({
        size: 0.8, vertexColors: true, transparent: true, opacity: 1, depthWrite: false
      })))

      const timeUniform  = uniform(0.0)
      const galaxyObjects = []
      const labelGroup    = new THREE.Group()
      scene.add(labelGroup)

      sceneRef.current = { scene, timeUniform, galaxyObjects, labelGroup }

      buildGalaxyMeshes(scene, timeUniform, galaxyObjects, usersRef.current, meRef.current)

      const raycaster = new THREE.Raycaster()
      const mouse     = new THREE.Vector2()
      let hovered     = null

      function getHit(e) {
        const rect = renderer.domElement.getBoundingClientRect()
        mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1
        mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1
        raycaster.setFromCamera(mouse, camera)
        const hitMeshes = galaxyObjects.map(o => o.hitMesh)
        const hits      = raycaster.intersectObjects(hitMeshes, false)
        return hits.length > 0 ? hits[0].object.userData.user : null
      }

      renderer.domElement.addEventListener('mousemove', e => {
        const u = getHit(e)
        if (u) {
          renderer.domElement.style.cursor = 'pointer'
          const isFriend = friendsRef.current.some(f => String(f.id) === String(u.id) && f.status === 'accepted')
          const isMe     = String(u.id) === String(meRef.current?.id)
          const label    = isMe
            ? 'Your galaxy — click to enter'
            : isFriend
              ? `${u.username} — click to enter`
              : `${u.username} — click to send friend request`
          setTooltip({ text: label, x: e.clientX, y: e.clientY })
          if (hovered !== u.id) {
            hovered = u.id
            controls.autoRotate = false
          }
        } else {
          renderer.domElement.style.cursor = 'default'
          setTooltip({ text: '', x: 0, y: 0 })
          hovered = null
        }
      })

      renderer.domElement.addEventListener('click', async e => {
        const u = getHit(e)
        if (!u) return
        const myId     = meRef.current?.id
        const isFriend = friendsRef.current.some(f => String(f.id) === String(u.id) && f.status === 'accepted')
        const isMe     = String(u.id) === String(myId)

        if (isMe || isFriend) {
          navigateRef.current(`/galaxy/${u.id}`)
          return
        }
        const alreadySent = friendsRef.current.some(f => String(f.id) === String(u.id))
        if (alreadySent) {
          setTooltip({ text: 'Request already sent', x: e.clientX, y: e.clientY })
          return
        }
        try {
          await api.sendRequest(u.id)
          const updated = await api.getFriends()
          setFriends(updated)
          setTooltip({ text: `Friend request sent to ${u.username}!`, x: e.clientX, y: e.clientY })
        } catch (err) {
          setTooltip({ text: err.message, x: e.clientX, y: e.clientY })
        }
      })

      function onResize() {
        const W2 = el.clientWidth, H2 = el.clientHeight
        camera.aspect = W2 / H2
        camera.updateProjectionMatrix()
        renderer.setSize(W2, H2)
      }
      window.addEventListener('resize', onResize)

      let t = 0
      async function tick() {
        animId = requestAnimationFrame(tick)
        t += 0.008
        timeUniform.value = t * 0.5
        controls.update()
        await renderer.renderAsync(scene, camera)
      }
      tick()

      el._universeCleanup = () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('resize', onResize)
        renderer.dispose()
        scene.clear()
        sceneRef.current = null
        if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
      }
    }

    init().catch(console.error)
    return () => { el._universeCleanup?.(); delete el._universeCleanup }
  }, [])

  return (
    <div className="page">
      <div ref={mountRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      {tooltip.text && (
        <div className="tooltip visible" style={{ left: tooltip.x + 14, top: tooltip.y - 10, position: 'fixed' }}>
          {tooltip.text}
        </div>
      )}
      <div className="zoom-bar">
        <button className="zb active">Universe</button>
      </div>
    </div>
  )
}
