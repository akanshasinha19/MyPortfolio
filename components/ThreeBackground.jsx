"use client"

import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const ThreeBackground = ({ className }) => {
  const mountRef = useRef(null)
  
  useEffect(() => {
    // Current element reference to mount canvas
    const currentRef = mountRef.current
    
    // Scene setup
    const scene = new THREE.Scene()
    
    // Camera setup with parameters: FOV, aspect ratio, near, far
    const camera = new THREE.PerspectiveCamera(
      75,
      currentRef.clientWidth / currentRef.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 5
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    })
    renderer.setSize(currentRef.clientWidth, currentRef.clientHeight)
    renderer.setClearColor(0x000000, 0)
    currentRef.appendChild(renderer.domElement)
    
    // Orbit controls to move the camera around
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5
    
    // Particles system
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 3000
    
    const posArray = new Float32Array(particlesCount * 3)
    const colorsArray = new Float32Array(particlesCount * 3)
    
    // Create random positions for particles
    for (let i = 0; i < particlesCount * 3; i++) {
      // Create a sphere of particles
      if (i % 3 === 0) {
        const r = 4 + Math.random() * 2
        const theta = Math.random() * Math.PI * 2
        const phi = Math.random() * Math.PI
        posArray[i] = r * Math.sin(phi) * Math.cos(theta) // x
        posArray[i + 1] = r * Math.sin(phi) * Math.sin(theta) // y
        posArray[i + 2] = r * Math.cos(phi) // z
      }
      
      // Random colors with theme consistency
      colorsArray[i] = Math.random() * 0.2 + 0.3 // r channel (mostly purple/blue)
      colorsArray[i + 1] = Math.random() * 0.1 // g channel (low green)
      colorsArray[i + 2] = Math.random() * 0.5 + 0.5 // b channel (high blue)
    }
    
    particlesGeometry.setAttribute(
      'position', 
      new THREE.BufferAttribute(posArray, 3)
    )
    particlesGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colorsArray, 3)
    )
    
    // Material for particles
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      sizeAttenuation: true,
    })
    
    // Points mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)
    
    // Mouse interaction
    let mouseX = 0
    let mouseY = 0
    
    document.addEventListener('mousemove', (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    })
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      
      // Gentle rotation based on mouse position
      particlesMesh.rotation.y += 0.002
      particlesMesh.rotation.x += 0.001
      
      // Mouse-based subtle movement
      particlesMesh.rotation.x += mouseY * 0.0005
      particlesMesh.rotation.y += mouseX * 0.0005
      
      controls.update()
      renderer.render(scene, camera)
    }
    animate()
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = currentRef.clientWidth / currentRef.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(currentRef.clientWidth, currentRef.clientHeight)
    }
    
    window.addEventListener('resize', handleResize)
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousemove', () => {})
      currentRef.removeChild(renderer.domElement)
    }
  }, [])
  
  return (
    <div 
      ref={mountRef} 
      className={className}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  )
}

export default ThreeBackground
