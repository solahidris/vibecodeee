'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 35

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Create multiple wild blob shapes
    const blobs: THREE.Mesh[] = []
    const blobData: { 
      speedX: number
      speedY: number
      speedZ: number
      phaseX: number
      phaseY: number
      phaseZ: number
      rangeX: number
      rangeY: number
      rangeZ: number
      rotSpeed: number
      pulseSpeed: number
      pulseAmount: number
    }[] = []

    // Fewer blobs, orange brand colors
    const blobConfigs = [
      { x: -12, y: 8, z: -8, scale: 12, color: 0xfed7aa, opacity: 0.35 },  // Light orange (orange-200)
      { x: 15, y: -10, z: -10, scale: 14, color: 0xfdba74, opacity: 0.3 }, // Orange (orange-300)
      { x: -8, y: -15, z: -6, scale: 10, color: 0xffedd5, opacity: 0.25 }, // Pale orange (orange-100)
      { x: 18, y: 12, z: -12, scale: 11, color: 0xfb923c, opacity: 0.3 },  // Vibrant orange (orange-400)
    ]

    blobConfigs.forEach((config, index) => {
      const geometry = new THREE.IcosahedronGeometry(config.scale, 3)
      const material = new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: config.opacity,
      })

      const blob = new THREE.Mesh(geometry, material)
      blob.position.set(config.x, config.y, config.z)
      scene.add(blob)
      blobs.push(blob)
      
      // Wild random movement parameters for each blob
      blobData.push({
        speedX: 0.3 + Math.random() * 0.8,
        speedY: 0.4 + Math.random() * 0.7,
        speedZ: 0.2 + Math.random() * 0.5,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        phaseZ: Math.random() * Math.PI * 2,
        rangeX: 8 + Math.random() * 15,
        rangeY: 8 + Math.random() * 15,
        rangeZ: 3 + Math.random() * 8,
        rotSpeed: 0.2 + Math.random() * 0.5,
        pulseSpeed: 0.5 + Math.random() * 1.5,
        pulseAmount: 0.15 + Math.random() * 0.25,
      })
    })

    // More animated rings with varied sizes
    const rings: THREE.Mesh[] = []
    const ringData: { rotSpeedZ: number; rotSpeedX: number; wobbleSpeed: number; wobbleAmount: number }[] = []

    for (let i = 0; i < 6; i++) {
      const ringGeometry = new THREE.TorusGeometry(5 + i * 5, 0.2 + Math.random() * 0.3, 16, 100)
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0xfed7aa : i % 3 === 1 ? 0xfdba74 : 0xffedd5,
        transparent: true,
        opacity: 0.25 - i * 0.03,
      })
      const ring = new THREE.Mesh(ringGeometry, ringMaterial)
      ring.position.z = -15 - i * 4
      ring.rotation.x = Math.PI * (0.3 + Math.random() * 0.3)
      ring.rotation.y = Math.random() * Math.PI
      scene.add(ring)
      rings.push(ring)
      ringData.push({
        rotSpeedZ: 0.1 + Math.random() * 0.3,
        rotSpeedX: 0.05 + Math.random() * 0.15,
        wobbleSpeed: 0.3 + Math.random() * 0.5,
        wobbleAmount: 0.1 + Math.random() * 0.2,
      })
    }

    // More particles, moving faster
    const particleCount = 250
    const particleGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50 - 10
      velocities[i * 3] = (Math.random() - 0.5) * 0.05
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xfb923c,
      size: 0.2,
      transparent: true,
      opacity: 0.5,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    // Mouse interaction - more responsive
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.targetX = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.targetY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    let animationId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()
      
      // Smooth mouse following
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08

      // Animate blobs with WILD movement
      blobs.forEach((blob, index) => {
        const data = blobData[index]
        const config = blobConfigs[index]
        
        // Crazy floating movement with multiple sine waves
        blob.position.x = config.x + 
          Math.sin(elapsedTime * data.speedX + data.phaseX) * data.rangeX +
          Math.cos(elapsedTime * data.speedY * 0.7 + data.phaseY) * data.rangeX * 0.3 +
          mouseRef.current.x * 8
          
        blob.position.y = config.y + 
          Math.cos(elapsedTime * data.speedY + data.phaseY) * data.rangeY +
          Math.sin(elapsedTime * data.speedX * 0.6 + data.phaseX) * data.rangeY * 0.4 +
          mouseRef.current.y * 6
          
        blob.position.z = config.z + 
          Math.sin(elapsedTime * data.speedZ + data.phaseZ) * data.rangeZ
        
        // Wild rotation
        blob.rotation.x = elapsedTime * data.rotSpeed + Math.sin(elapsedTime * 0.5) * 0.5
        blob.rotation.y = elapsedTime * data.rotSpeed * 1.3 + Math.cos(elapsedTime * 0.7) * 0.3
        blob.rotation.z = Math.sin(elapsedTime * data.rotSpeed * 0.8) * 0.4
        
        // Dramatic scale pulsing
        const scalePulse = 1 + Math.sin(elapsedTime * data.pulseSpeed + data.phaseX) * data.pulseAmount
        blob.scale.setScalar(scalePulse)
      })

      // Animate rings with more movement
      rings.forEach((ring, index) => {
        const data = ringData[index]
        ring.rotation.z = elapsedTime * data.rotSpeedZ * (index % 2 === 0 ? 1 : -1)
        ring.rotation.x += Math.sin(elapsedTime * data.wobbleSpeed) * 0.002
        ring.rotation.y += Math.cos(elapsedTime * data.wobbleSpeed * 0.8) * 0.001
        
        // Rings also respond to mouse
        ring.position.x = Math.sin(elapsedTime * 0.2 + index) * 3 + mouseRef.current.x * 2
        ring.position.y = Math.cos(elapsedTime * 0.15 + index) * 2 + mouseRef.current.y * 1.5
      })

      // Animate particles with velocity
      const positionArray = particleGeometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        
        // Add velocity-based movement
        positionArray[i3] += velocities[i3] + Math.sin(elapsedTime * 2 + i * 0.1) * 0.02
        positionArray[i3 + 1] += velocities[i3 + 1] + Math.cos(elapsedTime * 1.5 + i * 0.1) * 0.025
        positionArray[i3 + 2] += velocities[i3 + 2]
        
        // Wrap around boundaries
        if (positionArray[i3] > 40) positionArray[i3] = -40
        if (positionArray[i3] < -40) positionArray[i3] = 40
        if (positionArray[i3 + 1] > 40) positionArray[i3 + 1] = -40
        if (positionArray[i3 + 1] < -40) positionArray[i3 + 1] = 40
      }
      particleGeometry.attributes.position.needsUpdate = true

      // Particles rotate and respond to mouse
      particles.rotation.y = elapsedTime * 0.05
      particles.rotation.x = mouseRef.current.y * 0.1
      particles.rotation.z = mouseRef.current.x * 0.1

      // Camera follows mouse more dramatically
      camera.position.x += (mouseRef.current.x * 10 - camera.position.x) * 0.04
      camera.position.y += (mouseRef.current.y * 8 - camera.position.y) * 0.04
      camera.lookAt(0, 0, -10)

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      blobs.forEach(blob => {
        blob.geometry.dispose()
        ;(blob.material as THREE.Material).dispose()
      })
      rings.forEach(ring => {
        ring.geometry.dispose()
        ;(ring.material as THREE.Material).dispose()
      })
      particleGeometry.dispose()
      particleMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  )
}
