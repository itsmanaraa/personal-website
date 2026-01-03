"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MeshDistortMaterial, Sphere } from "@react-three/drei"
import * as THREE from "three"

export function Hero3D() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (!meshRef.current) return
        const time = state.clock.getElapsedTime()

        // Slow rotation
        meshRef.current.rotation.x = time * 0.1
        meshRef.current.rotation.y = time * 0.15

        // Mouse influence (subtle)
        const { x, y } = state.pointer
        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x * 0.5, 0.1)
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y * 0.5, 0.1)
    })

    return (
        <group dispose={null}>
            <Sphere args={[1, 64, 64]} scale={2} ref={meshRef}>
                <MeshDistortMaterial
                    color="#18181B"
                    envMapIntensity={1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    metalness={0.1}
                    roughness={0.5} // slightly frosted
                    distort={0.4} // Strength of distortion
                    speed={2} // Speed of distortion
                />
            </Sphere>
            {/* Ambient glow mesh behind */}
            <Sphere args={[1, 32, 32]} scale={1.8} position={[0, 0, -1]}>
                <meshBasicMaterial color="#3B82F6" transparent opacity={0.05} />
            </Sphere>
        </group>
    )
}
