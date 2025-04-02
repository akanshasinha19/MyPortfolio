"use client"

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  className?: string;
}

export default function ThreeBackground({ className = '' }: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create diverse snowflake-like particles
    const particlesCount = 200;
    const particles = new THREE.Group();
    
    // Define several snowflake geometries for diversity
    const snowflakeGeometries = [
      new THREE.CircleGeometry(0.2, 5),                    // Star-like snowflake
      new THREE.CircleGeometry(0.15, 6),                   // Hexagon snowflake
      new THREE.TetrahedronGeometry(0.2),                  // Crystal-like
      new THREE.OctahedronGeometry(0.2, 0),                // Diamond shape
      new THREE.PlaneGeometry(0.2, 0.2),                   // Square snowflake
      new THREE.CircleGeometry(0.2, 8).scale(1, 0.5, 1),   // Oval snowflake
    ];
    
    // Create a range of materials with different colors
    const snowflakeMaterials = [
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 }),
      new THREE.MeshBasicMaterial({ color: 0xeeeeff, transparent: true, opacity: 0.7 }),
      new THREE.MeshBasicMaterial({ color: 0xccf2ff, transparent: true, opacity: 0.6 }),
      new THREE.MeshBasicMaterial({ color: 0xaae4ff, transparent: true, opacity: 0.5 }),
      new THREE.MeshBasicMaterial({ color: 0xdddddd, transparent: true, opacity: 0.4 }),
    ];
    
    // Generate random positions, rotations, and speeds for each particle
    for (let i = 0; i < particlesCount; i++) {
      // Randomly select a geometry and material
      const geomIndex = Math.floor(Math.random() * snowflakeGeometries.length);
      const matIndex = Math.floor(Math.random() * snowflakeMaterials.length);
      
      const particle = new THREE.Mesh(
        snowflakeGeometries[geomIndex],
        snowflakeMaterials[matIndex]
      );
      
      // Set random positions
      particle.position.x = (Math.random() - 0.5) * 60;
      particle.position.y = (Math.random() - 0.5) * 60;
      particle.position.z = (Math.random() - 0.5) * 30;
      
      // Add random rotation
      particle.rotation.x = Math.random() * Math.PI;
      particle.rotation.y = Math.random() * Math.PI;
      
      // Store random movement properties
      particle.userData.speedX = (Math.random() - 0.5) * 0.05;
      particle.userData.speedY = (Math.random() - 0.5) * 0.05;
      particle.userData.speedRotation = (Math.random() - 0.5) * 0.01;
      
      // Add random scale for more diverse sizes
      const scale = 0.5 + Math.random() * 1.5;
      particle.scale.set(scale, scale, scale);
      
      particles.add(particle);
    }
    scene.add(particles);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update particle positions and rotations
      particles.children.forEach((particle: THREE.Mesh) => {
        // Move particles
        particle.position.x += particle.userData.speedX;
        particle.position.y += particle.userData.speedY;
        
        // Rotate particles
        particle.rotation.x += particle.userData.speedRotation;
        particle.rotation.y += particle.userData.speedRotation;
        
        // Reset position when out of bounds
        if (Math.abs(particle.position.x) > 30) {
          particle.position.x = -30 * Math.sign(particle.position.x);
        }
        if (Math.abs(particle.position.y) > 30) {
          particle.position.y = -30 * Math.sign(particle.position.y);
        }
      });
      
      renderer.render(scene, camera);
    };
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      particles.children.forEach((particle: THREE.Mesh) => {
        particle.geometry.dispose();
        (particle.material as THREE.Material).dispose();
      });
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className={`fixed inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
