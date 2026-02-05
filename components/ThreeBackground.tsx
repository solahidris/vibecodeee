'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Create floating geometric shapes with varied geometries
    const geometries = [
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TetrahedronGeometry(1, 0),
      new THREE.TorusGeometry(0.8, 0.3, 16, 32),
    ]

    const shapes: THREE.Mesh[] = []
    const shapeCount = 25

    for (let i = 0; i < shapeCount; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)]
      const material = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0x3f3f46 : i % 3 === 1 ? 0x52525b : 0x71717a,
        wireframe: true,
        transparent: true,
        opacity: 0.15 + Math.random() * 0.15,
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.x = (Math.random() - 0.5) * 30
      mesh.position.y = (Math.random() - 0.5) * 30
      mesh.position.z = (Math.random() - 0.5) * 30
      mesh.rotation.x = Math.random() * Math.PI
      mesh.rotation.y = Math.random() * Math.PI
      mesh.scale.setScalar(Math.random() * 0.8 + 0.4)
      scene.add(mesh)
      shapes.push(mesh)
    }

    // Add particles
    const particleGeometry = new THREE.BufferGeometry()
    const particleCount = 150
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x71717a,
      size: 0.05,
      transparent: true,
      opacity: 0.4,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    camera.position.z = 10

    // Mouse interaction
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate shapes
      shapes.forEach((mesh, index) => {
        mesh.rotation.x += 0.002 * (index % 3 + 1)
        mesh.rotation.y += 0.002 * (index % 3 + 1)

        // Subtle floating motion
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001
      })

      // Rotate particles slowly
      particles.rotation.y += 0.0002

      // Camera follows mouse subtly
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.02
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.02
      camera.lookAt(scene.position)

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
      containerRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-20 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  )
}
