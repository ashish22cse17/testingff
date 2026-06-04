import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls }  from 'three/examples/jsm/controls/OrbitControls.js'
import WebGPURenderer     from 'three/examples/jsm/renderers/webgpu/WebGPURenderer.js'
import * as NodeModules   from 'three/examples/jsm/nodes/Nodes.js'
import { buildGalaxy }    from '../galaxyData.js'

const { uniform } = NodeModules

/* ── Planet colours keyed by planetType 1-7 ─────────────────── */
const PLANET_COLORS = [
	'#4fc3f7', // ice blue
	'#ef9a9a', // rose red
	'#a5d6a7', // mint
	'#fff176', // yellow
	'#ce93d8', // lavender
	'#80deea', // cyan
	'#ffcc80', // amber
]

/* ── Star positions inside the galaxy arms (40 slots) ─────────── */
// Each star is placed at a spiral angle + radius so it looks
// embedded in the spiral. Slight Y jitter for depth.
const STAR_SLOTS = (() => {
	const slots = []
	for (let i = 0; i < 40; i++) {
		const angle = (i / 40) * Math.PI * 2 + (i / 40) * Math.PI * 6
		const radius = 1.5 + (i / 40) * 2.5
		const yOff = (Math.random() - 0.5) * 0.15
		slots.push({ angle, radius, yOff })
	}
	return slots
})()

/* ── Glow sprite builder ─────────────────────────────────────── */
function makeGlowSprite(hexColor, size) {
	const c   = document.createElement('canvas'); c.width = c.height = 128
	const ctx = c.getContext('2d')
	const col = new THREE.Color(hexColor)
	const g   = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
	g.addColorStop(0,    'rgba(255,255,255,1)')
	g.addColorStop(0.12, `rgba(${~~(col.r*255)},${~~(col.g*255)},${~~(col.b*255)},0.95)`)
	g.addColorStop(0.45, `rgba(${~~(col.r*255)},${~~(col.g*255)},${~~(col.b*255)},0.35)`)
	g.addColorStop(1,    'rgba(0,0,0,0)')
	ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128)
	const s = new THREE.Sprite(new THREE.SpriteMaterial({
		map: new THREE.CanvasTexture(c),
		blending: THREE.AdditiveBlending, depthWrite: false, transparent: true
	}))
	s.scale.setScalar(size)
	return s
}

/* ── Planet mesh + pivot ─────────────────────────────────────── */
function makePlanet(planetType, orbitRadius) {
	const col   = PLANET_COLORS[(planetType - 1) % PLANET_COLORS.length]
	const color = new THREE.Color(col)

	// Planet sphere
	const mesh = new THREE.Mesh(
		new THREE.SphereGeometry(0.022, 12, 12),
		new THREE.MeshStandardMaterial({
			color, emissive: color, emissiveIntensity: 0.9,
			roughness: 0.5, metalness: 0.1,
		})
	)
	mesh.position.set(orbitRadius, 0, 0)

	// Orbit ring (visual only)
	const orbitPts = []
	for (let i = 0; i <= 96; i++) {
		const a = (i / 96) * Math.PI * 2
		orbitPts.push(new THREE.Vector3(Math.cos(a) * orbitRadius, 0, Math.sin(a) * orbitRadius))
	}
	const orbitLine = new THREE.Line(
		new THREE.BufferGeometry().setFromPoints(orbitPts),
		new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.2 })
	)

	// Pivot drives orbit rotation
	const pivot = new THREE.Object3D()
	pivot.rotation.y = Math.random() * Math.PI * 2
	pivot.rotation.x = (Math.random() - 0.5) * 0.5  // slight tilt
	pivot.add(mesh)

	return { pivot, mesh, orbitLine }
}

/* ═══════════════════════════════════════════════════════════════
	 GalaxyCanvas component
	 Props:
		 galaxyDef  — same def shape used in UniversePage / buildGalaxy()
		 stars      — Array(40): { friend: User, comments: Comment[] }
		 isOwner    — bool
		 me         — current user
		 onStarClick(slot)      — called with the slot object
		 onHover(slot|null,x,y) — called on mousemove
═══════════════════════════════════════════════════════════════ */
export default function GalaxyCanvas({
	galaxyDef, stars, isOwner, me, onStarClick, onHover
}) {
	const mountRef = useRef(null)

	useEffect(() => {
		const el = mountRef.current
		if (!el || !galaxyDef) return

		let animId
		let renderer

		async function init() {
			renderer = new WebGPURenderer({ antialias: true })
			await renderer.init()
			renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
			renderer.setClearColor('#000008')
			el.appendChild(renderer.domElement)

			const W = el.clientWidth  || innerWidth
			const H = el.clientHeight || innerHeight
			renderer.setSize(W, H)

			const scene  = new THREE.Scene()
			const camera = new THREE.PerspectiveCamera(45, W / H, 0.001, 2000)
			camera.position.set(0, 14, 22)

			const controls = new OrbitControls(camera, renderer.domElement)
			controls.enableDamping   = true
			controls.dampingFactor   = 0.05
			controls.enablePan       = false
			controls.target.set(0, 0, 0)
			controls.maxDistance     = 35
			controls.minDistance     = 1.5
			controls.autoRotate      = true
			controls.autoRotateSpeed = 0.2
			controls.minPolarAngle   = 0
			controls.maxPolarAngle   = Math.PI
			controls.update()

			;(() => {
				const N   = 15000
				const pos = new Float32Array(N * 3)
				const col = new Float32Array(N * 3)
				const pal = [[1,.95,.85],[.85,.9,1],[1,.8,.7],[.9,1,.9],[1,1,1]]
				for (let i = 0; i < N; i++) {
					const t = Math.random() * Math.PI * 2
					const p = Math.acos(2 * Math.random() - 1)
					const r = 900 + Math.random() * 100
					pos[i*3]   = r*Math.sin(p)*Math.cos(t)
					pos[i*3+1] = r*Math.sin(p)*Math.sin(t)
					pos[i*3+2] = r*Math.cos(p)
					const sc = pal[Math.floor(Math.random() * pal.length)]
					const b  = .5 + Math.random() * .5
					col[i*3]=sc[0]*b; col[i*3+1]=sc[1]*b; col[i*3+2]=sc[2]*b
				}
				const geo = new THREE.BufferGeometry()
				geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
				geo.setAttribute('color',    new THREE.BufferAttribute(col, 3))
				scene.add(new THREE.Points(geo, new THREE.PointsMaterial({
					size: 0.8, vertexColors: true, transparent: true,
					opacity: 1, depthWrite: false
				})))
			})()

			scene.add(new THREE.AmbientLight(0x223366, 1.2))
			scene.add(new THREE.PointLight(0xffffff, 2.0, 40))

			const timeUniform = uniform(0.0)
			const galaxyGroup = new THREE.Group()

			const { mesh: galaxyMesh } = buildGalaxy(
				{
					...galaxyDef,
					position: new THREE.Vector3(0, 0, 0),
					rotation: new THREE.Euler(0, 0, 0),
				},
				timeUniform,
				5,
				NodeModules
			)
			galaxyGroup.add(galaxyMesh)

			galaxyGroup.add(makeGlowSprite(galaxyDef.colorInside, 1.8))
			scene.add(galaxyGroup)

			const starGroups   = []
			const hitMeshes    = []
			const planetPivots = []

			stars.slice(0, STAR_SLOTS.length).forEach((slot, slotIdx) => {
				const sp     = STAR_SLOTS[slotIdx]
				const starX  = Math.cos(sp.angle) * sp.radius
				const starZ  = Math.sin(sp.angle) * sp.radius
				const starPos= new THREE.Vector3(starX, sp.yOff, starZ)

				const grp = new THREE.Group()
				if (slot?.friend) {
					const a = Math.random() * Math.PI * 2
					const r = 0.6 + Math.random() * (Math.max(1, galaxyDef.radius) * 0.85)
					const y = (Math.random() - 0.5) * 0.15
					grp.position.set(Math.cos(a) * r, y, Math.sin(a) * r)
				} else {
					grp.position.copy(starPos)
				}

				const coreColor = new THREE.Color((slot?.friend?.color_in) || '#444444')
				const isFriend = Boolean(slot?.friend)
				const coreRadius = isFriend ? 0.02 : 0.065
				const core = new THREE.Mesh(
					new THREE.SphereGeometry(coreRadius, 12, 12),
					new THREE.MeshStandardMaterial({
						color: coreColor, emissive: coreColor,
						emissiveIntensity: isFriend ? 1.0 : 0.2, roughness: 1,
					})
				)
				grp.add(core)

				let glow = null, halo = null
				const glowSize = isFriend ? 0.28 : 0.55
				const haloSize = isFriend ? 0.6  : 1.05
				const glowColor = slot?.friend?.color_in || '#bdbdbd'
				glow = makeGlowSprite(glowColor, glowSize)
				halo = makeGlowSprite(glowColor, haloSize)
				halo.material.opacity = isFriend ? 0.25 : 0.3
				grp.add(glow, halo)

				const hit = new THREE.Mesh(
					new THREE.SphereGeometry(0.38, 8, 8),
					new THREE.MeshBasicMaterial({ visible: false })
				)
				hit.userData = { slotIdx, slot }
				grp.add(hit)
				hitMeshes.push(hit)

				const lc  = document.createElement('canvas'); lc.width = 256; lc.height = 48
				const lct = lc.getContext('2d')
				lct.font  = '500 18px Orbitron, monospace'
				lct.fillStyle   = slot?.friend?.color_in || 'rgba(200,200,200,0.6)'
				lct.textAlign   = 'center'
				lct.textBaseline= 'middle'
				lct.fillText(slot?.friend?.username ?? `Star ${slotIdx + 1}`, 128, 24)
				const labelSprite = new THREE.Sprite(new THREE.SpriteMaterial({
					map: new THREE.CanvasTexture(lc), transparent: true,
					depthWrite: false, opacity: 0.85
				}))
				labelSprite.scale.set(1.6, 0.3, 1)
				labelSprite.position.set(0, 0.5, 0)
				grp.add(labelSprite)

				if (slot?.comments) {
					slot.comments.forEach((comment, pi) => {
						const orbitR = 0.14 + pi * 0.10
						const { pivot, orbitLine } = makePlanet(comment.planet_type ?? (pi + 1), orbitR)
						pivot.scale.setScalar(0)
						const baseOrbitOpacity = orbitLine.material?.opacity ?? 0.2
						orbitLine.material.transparent = true
						orbitLine.material.opacity = 0
						orbitLine.visible = false
						grp.add(pivot)
						grp.add(orbitLine)
						planetPivots.push({ pivot, orbitLine, speed: 0.55 + pi * 0.18, baseOrbitOpacity })
					})
				}

				if (slot?.friend) {
					galaxyGroup.worldToLocal(grp.position)
					galaxyGroup.add(grp)
				} else scene.add(grp)
				const baseGlow = glow?.scale.x ?? (isFriend ? 0.28 : 0.55)
				const baseHalo = halo?.scale.x ?? (isFriend ? 0.6 : 1.05)
				starGroups.push({ grp, slot, glow, halo, slotIdx, isFriend, baseGlow, baseHalo })
			})

			const rc    = new THREE.Raycaster()
			const mouse = new THREE.Vector2()
			let   hoveredSlotIdx = -1

			function getHit(e) {
				const rect = renderer.domElement.getBoundingClientRect()
				mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1
				mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1
				rc.setFromCamera(mouse, camera)
				const hits = rc.intersectObjects(hitMeshes, false)
				return hits.length > 0 ? hits[0].object.userData : null
			}

			function onMouseMove(e) {
				const hit = getHit(e)
				if (hit) {
					renderer.domElement.style.cursor = 'pointer'
					hoveredSlotIdx = hit.slotIdx
					onHover?.(hit.slot, e.clientX, e.clientY)
				} else {
					renderer.domElement.style.cursor = 'default'
					hoveredSlotIdx = -1
					onHover?.(null, 0, 0)
				}
			}

			function onClickCanvas(e) {
				const hit = getHit(e)
				if (hit) {
					controls.autoRotate = false
					onStarClick?.(hit.slot)
				}
			}

			renderer.domElement.addEventListener('mousemove', onMouseMove)
			renderer.domElement.addEventListener('click',     onClickCanvas)

			function onResize() {
				const W2 = el.clientWidth, H2 = el.clientHeight
				if (!W2 || !H2) return
				camera.aspect = W2 / H2
				camera.updateProjectionMatrix()
				renderer.setSize(W2, H2)
			}
			window.addEventListener('resize', onResize)

			let t = 0
			const _rotAxis = new THREE.Vector3(0, 1, 0)
			async function tick() {
				animId = requestAnimationFrame(tick)
				t += 0.008

				timeUniform.value = t * 0.5

				const galDelta = 0.0025
				galaxyGroup.rotation.y += galDelta

				starGroups.forEach(({ grp, slot }) => {
					if (slot?.friend && grp.parent !== galaxyGroup) {
						grp.position.applyAxisAngle(_rotAxis, galDelta)
					}
				})

				planetPivots.forEach(({ pivot, speed }) => {
					pivot.rotation.y += speed * 0.016
				})

				starGroups.forEach(({ glow, halo, slotIdx, isFriend, baseGlow, baseHalo }, i) => {
					const pulse     = 1 + 0.14 * Math.sin(t * 2.2 + i * 1.4)
					const isHovered = slotIdx === hoveredSlotIdx
					if (glow) {
						const g = isHovered ? baseGlow * 1.6 : baseGlow * pulse
						glow.scale.setScalar(g)
						if (glow.material) glow.material.opacity = isHovered ? 0.95 : 0.85
					}
					if (halo) {
						const h = isHovered ? baseHalo * 1.6 : baseHalo * pulse
						halo.scale.setScalar(h)
						const baseOp = isFriend ? 0.25 : 0.3
						halo.material.opacity = isHovered ? 0.6 : baseOp
					}
				})

				const _tmp = new THREE.Vector3()
				const showDist = 6.0
				planetPivots.forEach(({ pivot, orbitLine, baseOrbitOpacity }) => {
					pivot.getWorldPosition(_tmp)
					const d = _tmp.distanceTo(camera.position)
					const target = d < showDist ? 1 : 0
					pivot.scale.lerp(new THREE.Vector3(target, target, target), 0.14)
					if (orbitLine) {
						if (target > 0 && !orbitLine.visible) orbitLine.visible = true
						const desired = baseOrbitOpacity * target
						orbitLine.material.opacity = THREE.MathUtils.lerp(orbitLine.material.opacity, desired, 0.14)
						if (orbitLine.material.opacity < 0.005) orbitLine.visible = false
					}
				})

				controls.update()
				await renderer.renderAsync(scene, camera)
			}
			tick()

			el._cleanup = () => {
				cancelAnimationFrame(animId)
				window.removeEventListener('resize', onResize)
				renderer.domElement.removeEventListener('mousemove', onMouseMove)
				renderer.domElement.removeEventListener('click',     onClickCanvas)
				renderer.dispose()
				scene.clear()
				if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
			}
		}

		init().catch(console.error)
		return () => { el._cleanup?.(); delete el._cleanup }

	}, [galaxyDef?.key, stars])

	return (
		<div
			ref={mountRef}
			style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
		/>
	)
}
