import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { technicalData } from '../../data/technicalData'
import { useSimulationStore, type Zone } from '../../store/useSimulationStore'

const EYE_HEIGHT = 1.64
const PLAYER_RADIUS = 0.24
const WORLD_X = 84
const WORLD_Z = 61

const zonePresets: Record<Zone, { position: [number, number, number]; target: [number, number, number] }> = {
  overview: { position: [10, EYE_HEIGHT, 46], target: [10, 1.2, 18] },
  bike: { position: [3.2, EYE_HEIGHT, 27.2], target: [3.3, 0.9, 24.1] },
  boiler: { position: [13.5, EYE_HEIGHT, 20.6], target: [10, 1.0, 18] },
  gas: { position: [16, EYE_HEIGHT, 12.2], target: [16, 1.0, 8.2] },
  grid: { position: [16.2, EYE_HEIGHT, 28.0], target: [16.2, 1.0, 24] }
}

type RectCollider = { type: 'rect'; x: number; z: number; hx: number; hz: number }
type CircleCollider = { type: 'circle'; x: number; z: number; r: number }
type Collider = RectCollider | CircleCollider

const colliders: Collider[] = [
  { type: 'rect', x: -34, z: -7, hx: 32.7, hz: 17.7 },
  { type: 'rect', x: 28, z: -42, hx: 24.7, hz: 14.7 },
  { type: 'rect', x: -28, z: -46, hx: 21.7, hz: 7.2 },
  { type: 'rect', x: 24, z: -10, hx: 10.7, hz: 6.7 },
  { type: 'rect', x: 10, z: 18, hx: 1.75, hz: 1.25 },
  { type: 'rect', x: 3.3, z: 24.1, hx: 1.0, hz: 1.15 },
  { type: 'rect', x: 16, z: 8.2, hx: 2.6, hz: 2.1 },
  { type: 'rect', x: 16.2, z: 24, hx: 0.75, hz: 0.7 },
  { type: 'rect', x: 10, z: 31, hx: 1.5, hz: 0.85 },
  { type: 'rect', x: 48, z: 16, hx: 14.5, hz: 23.5 }
]

function blocked(x: number, z: number) {
  if (Math.abs(x) > WORLD_X || Math.abs(z) > WORLD_Z) return true
  for (const collider of colliders) {
    if (collider.type === 'circle') {
      if (Math.hypot(x - collider.x, z - collider.z) < collider.r + PLAYER_RADIUS) return true
    } else {
      if (Math.abs(x - collider.x) < collider.hx + PLAYER_RADIUS && Math.abs(z - collider.z) < collider.hz + PLAYER_RADIUS) return true
    }
  }
  return false
}

function hotspotIdFromObject(object: THREE.Object3D | null): string | null {
  let current: THREE.Object3D | null = object
  while (current) {
    const id = current.userData?.hotspotId
    if (typeof id === 'string') return id
    current = current.parent
  }
  return null
}

export function FirstPersonController() {
  const { camera, gl, scene } = useThree()
  const yaw = useRef(0)
  const pitch = useRef(0)
  const pressed = useRef<Record<string, boolean>>({})
  const elapsedWalk = useRef(0)
  const aimTimer = useRef(0)
  const positionTimer = useRef(0)
  const lastAimed = useRef<string | null>(null)
  const initialized = useRef(false)
  const activeZone = useSimulationStore((s) => s.activeZone)
  const raycaster = useMemo(() => new THREE.Raycaster(), [])
  const center = useMemo(() => new THREE.Vector2(0, 0), [])

  useEffect(() => {
    camera.rotation.order = 'YXZ'
    const applyPreset = (zone: Zone) => {
      const preset = zonePresets[zone]
      camera.position.set(...preset.position)
      camera.lookAt(...preset.target)
      yaw.current = camera.rotation.y
      pitch.current = camera.rotation.x
      useSimulationStore.getState().setPlayerPosition({ x: camera.position.x, z: camera.position.z })
    }
    if (!initialized.current) {
      applyPreset('overview')
      initialized.current = true
    } else {
      applyPreset(activeZone)
    }
  }, [activeZone, camera])

  useEffect(() => {
    const canvas = gl.domElement
    const setExploring = useSimulationStore.getState().setExploring
    const resetMovement = useSimulationStore.getState().resetMovement

    const onLockChange = () => {
      const locked = document.pointerLockElement === canvas
      setExploring(locked)
      if (!locked) resetMovement()
    }

    const onMouseMove = (event: MouseEvent) => {
      if (document.pointerLockElement !== canvas) return
      yaw.current -= event.movementX * 0.00215
      pitch.current -= event.movementY * 0.0019
      pitch.current = THREE.MathUtils.clamp(pitch.current, -1.18, 1.18)
    }

    const inspect = () => {
      raycaster.setFromCamera(center, camera)
      raycaster.far = 4.0
      const hits = raycaster.intersectObjects(scene.children, true)
      for (const hit of hits) {
        const id = hotspotIdFromObject(hit.object)
        if (id && technicalData[id]) {
          useSimulationStore.getState().selectComponent(id)
          if (document.pointerLockElement) document.exitPointerLock()
          return
        }
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ShiftLeft','ShiftRight'].includes(event.code)) {
        pressed.current[event.code] = true
        if (document.pointerLockElement === canvas) event.preventDefault()
      }
      if (event.code === 'KeyE' && document.pointerLockElement === canvas) {
        event.preventDefault()
        inspect()
      }
    }
    const onKeyUp = (event: KeyboardEvent) => { pressed.current[event.code] = false }
    const onMobileLook = (event: Event) => {
      const detail = (event as CustomEvent<{ dx: number; dy: number }>).detail
      if (!detail) return
      yaw.current -= detail.dx * 0.006
      pitch.current -= detail.dy * 0.005
      pitch.current = THREE.MathUtils.clamp(pitch.current, -1.18, 1.18)
    }
    const onMobileInspect = () => inspect()

    document.addEventListener('pointerlockchange', onLockChange)
    document.addEventListener('mousemove', onMouseMove)
    window.addEventListener('keydown', onKeyDown, { passive: false })
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('fenachim-mobile-look', onMobileLook as EventListener)
    window.addEventListener('fenachim-inspect', onMobileInspect)
    return () => {
      document.removeEventListener('pointerlockchange', onLockChange)
      document.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('fenachim-mobile-look', onMobileLook as EventListener)
      window.removeEventListener('fenachim-inspect', onMobileInspect)
    }
  }, [camera, center, gl, raycaster, scene])

  useFrame((_, delta) => {
    camera.rotation.set(pitch.current, yaw.current, 0, 'YXZ')
    const state = useSimulationStore.getState()
    const movement = state.movement
    const forwardPressed = pressed.current.KeyW || pressed.current.ArrowUp || movement.forward
    const backwardPressed = pressed.current.KeyS || pressed.current.ArrowDown || movement.backward
    const leftPressed = pressed.current.KeyA || pressed.current.ArrowLeft || movement.left
    const rightPressed = pressed.current.KeyD || pressed.current.ArrowRight || movement.right
    const sprinting = pressed.current.ShiftLeft || pressed.current.ShiftRight || movement.sprint
    const moving = forwardPressed || backwardPressed || leftPressed || rightPressed
    const pointerLocked = document.pointerLockElement === gl.domElement
    const mobileActive = movement.forward || movement.backward || movement.left || movement.right
    const canMove = pointerLocked || mobileActive

    if (moving && canMove) {
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion)
      forward.y = 0
      forward.normalize()
      const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion)
      right.y = 0
      right.normalize()
      const direction = new THREE.Vector3()
      if (forwardPressed) direction.add(forward)
      if (backwardPressed) direction.sub(forward)
      if (rightPressed) direction.add(right)
      if (leftPressed) direction.sub(right)

      if (direction.lengthSq() > 0) {
        direction.normalize()
        const speed = sprinting ? 5.6 : 3.05
        const step = speed * delta
        const nextX = camera.position.x + direction.x * step
        const nextZ = camera.position.z + direction.z * step
        if (!blocked(nextX, camera.position.z)) camera.position.x = nextX
        if (!blocked(camera.position.x, nextZ)) camera.position.z = nextZ
        elapsedWalk.current += delta * (sprinting ? 12 : 8)
      }
    }

    const bob = moving && canMove ? Math.sin(elapsedWalk.current) * 0.018 : 0
    camera.position.y += (EYE_HEIGHT + bob - camera.position.y) * Math.min(1, delta * 12)

    positionTimer.current += delta
    if (positionTimer.current > 0.12) {
      positionTimer.current = 0
      state.setPlayerPosition({ x: camera.position.x, z: camera.position.z })
    }

    aimTimer.current += delta
    if (aimTimer.current > 0.12) {
      aimTimer.current = 0
      raycaster.setFromCamera(center, camera)
      raycaster.far = 4.0
      const hits = raycaster.intersectObjects(scene.children, true)
      let aimed: string | null = null
      for (const hit of hits) {
        const id = hotspotIdFromObject(hit.object)
        if (id && technicalData[id]) { aimed = id; break }
      }
      if (aimed !== lastAimed.current) {
        lastAimed.current = aimed
        state.setAimedComponent(aimed)
      }
    }
  })

  return null
}
