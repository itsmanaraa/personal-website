"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { MeshDistortMaterial, Sphere } from "@react-three/drei"
import * as THREE from "three"

export function Hero3D() {
    const meshRef = useRef<THREE.Mesh>(null)

    const [tilt, setTilt] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleOrientation = (e: DeviceOrientationEvent) => {
            if (e.beta !== null && e.gamma !== null) {
                // beta: -180 to 180 (front-to-back tilt)
                // gamma: -90 to 90 (left-to-right tilt)
                setTilt({
                    x: (e.beta / 180) * 2,
                    y: (e.gamma / 90) * 2
                })
            }
        }
        window.addEventListener('deviceorientation', handleOrientation)
        return () => window.removeEventListener('deviceorientation', handleOrientation)
    }, [])

    useFrame((state) => {
        if (!meshRef.current) return
        const time = state.clock.getElapsedTime()

        // Get scroll velocity
        const scrollY = typeof window !== 'undefined' ? window.scrollY : 0
        const velocity = Math.min(Math.abs(scrollY * 0.001), 2)

        // Slow rotation + velocity boost + tilt influence
        meshRef.current.rotation.x = time * (0.1 + velocity * 0.5) + tilt.x * 0.2
        meshRef.current.rotation.y = time * (0.15 + velocity * 0.5) + tilt.y * 0.2

        // Mouse influence (subtle)
        const { x, y } = state.pointer
        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x * (0.5 + velocity) + tilt.y * 0.5, 0.1)
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y * (0.5 + velocity) - tilt.x * 0.5, 0.1)
    })

    return (
        <group dispose={null}>
            <Sphere args={[1, 64, 64]} scale={2} ref={meshRef}>
                <MeshDistortMaterial
                    color="#2A2A2A"
                    envMapIntensity={2}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    metalness={0.1}
                    roughness={0.5} // slightly frosted
                    distort={0.4} // Strength of distortion
                    speed={2 + (typeof window !== 'undefined' ? window.scrollY * 0.01 : 0)} // Speed of distortion
                />
            </Sphere>
            {/* Ambient glow mesh behind */}
            <Sphere args={[1, 32, 32]} scale={1.8} position={[0, 0, -1]}>
                <meshBasicMaterial color="#3B82F6" transparent opacity={0.05} />
            </Sphere>
        </group>
    )
}
