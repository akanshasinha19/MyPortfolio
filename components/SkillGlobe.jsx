"use client"

import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'

// Predefined colors to avoid random generation
const COLORS = [
  new THREE.Color(0.8, 0.2, 0.2),  // Red
  new THREE.Color(0.2, 0.8, 0.2),  // Green
  new THREE.Color(0.2, 0.2, 0.8),  // Blue
  new THREE.Color(0.8, 0.8, 0.2),  // Yellow
  new THREE.Color(0.8, 0.2, 0.8),  // Purple
  new THREE.Color(0.2, 0.8, 0.8),  // Cyan
  new THREE.Color(0.8, 0.5, 0.2),  // Orange
  new THREE.Color(0.5, 0.8, 0.2),  // Lime
  new THREE.Color(0.2, 0.5, 0.8),  // Sky blue
  new THREE.Color(0.7, 0.3, 0.5),  // Mauve
]

const SkillGlobe = ({ className, skills = ["Product", "Analytics", "Strategy", "SQL", "Leadership", "Agile"] }) => {
  const mountRef = useRef(null)
  const [isClient, setIsClient] = useState(false)
  
  // Set client-side flag on mount
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  useEffect(() => {
    // Only run Three.js code on the client side
    if (!isClient || !mountRef.current) return
    
    const currentRef = mountRef.current
    
    // Scene setup
    const scene = new THREE.Scene()
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      currentRef.clientWidth / currentRef.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 20
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    })
    renderer.setSize(currentRef.clientWidth, currentRef.clientHeight)
    renderer.setClearColor(0x000000, 0)
    currentRef.appendChild(renderer.domElement)
    
    // Create spherical positions for skills
    const skillObjects = []
    const fontLoader = new FontLoader()
    
    // Load font for text
    fontLoader.load('/fonts/helvetiker_regular.typeface.json', function(font) {
      skills.forEach((skill, index) => {
        const phi = Math.acos(-1 + (2 * index) / skills.length)
        const theta = Math.sqrt(skills.length * Math.PI) * phi
        
        // Create invisible sphere for positioning
        const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16)
        const sphereMaterial = new THREE.MeshBasicMaterial({ 
          color: 0xffffff,
          transparent: true,
          opacity: 0.0
        })
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        
        // Position on globe
        const radius = 10
        sphere.position.x = radius * Math.sin(phi) * Math.cos(theta)
        sphere.position.y = radius * Math.sin(phi) * Math.sin(theta)
        sphere.position.z = radius * Math.cos(phi)
        
        // Create skill text
        const textGeometry = new TextGeometry(skill, {
          font: font,
          size: 0.7,
          height: 0.1
        })
        
        // Center text
        textGeometry.computeBoundingBox()
        const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x
        
        // Use deterministic color based on index
        const colorIndex = index % COLORS.length
        const textMaterial = new THREE.MeshBasicMaterial({ 
          color: COLORS[colorIndex],
        })
        const textMesh = new THREE.Mesh(textGeometry, textMaterial)
        
        // Position text slightly in front of sphere
        textMesh.position.copy(sphere.position)
        
        // Make text face camera
        textMesh.lookAt(camera.position)
        
        // Offset to center text
        textMesh.position.x -= textWidth / 2
        
        scene.add(sphere)
        scene.add(textMesh)
        skillObjects.push({ sphere, textMesh })
      })
    })
    
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    
    // Animation
    function animate() {
      requestAnimationFrame(animate)
      
      // Rotate the entire scene slightly
      scene.rotation.y += 0.003
      
      skillObjects.forEach(obj => {
        // Make text always face camera
        if (obj.textMesh) {
          obj.textMesh.quaternion.copy(camera.quaternion)
        }
      })
      
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
      if (currentRef.contains(renderer.domElement)) {
        currentRef.removeChild(renderer.domElement)
      }
      // Dispose resources to prevent memory leaks
      skillObjects.forEach(obj => {
        if (obj.sphere) {
          obj.sphere.geometry.dispose()
          obj.sphere.material.dispose()
        }
        if (obj.textMesh) {
          obj.textMesh.geometry.dispose()
          obj.textMesh.material.dispose()
        }
      })
    }
  }, [skills, isClient]) // Add isClient to the dependency array
  
  // Show a placeholder or nothing while on server
  if (!isClient) {
    return (
      <div 
        className={className}
        style={{ width: '100%', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <div>Loading 3D Skills Globe...</div>
      </div>
    )
  }
  
  return (
    <div 
      ref={mountRef} 
      className={className}
      style={{ width: '100%', height: '300px' }}
    />
  )
}

export default SkillGlobe
