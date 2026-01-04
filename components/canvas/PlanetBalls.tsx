"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

function FloatingBall({ position, scale, color, speed }: { position: [number, number, number], scale: number, color: string, speed: number }) {
    const meshRef = useRef<THREE.Mesh>(null)
    const initialY = position[1]
    const randomOffset = useMemo(() => Math.random() * 100, [])

    useFrame((state) => {
        if (!meshRef.current) return
        const time = state.clock.getElapsedTime()

        // Floating motion
        meshRef.current.position.y = initialY + Math.sin(time * speed + randomOffset) * 0.2

        // Rotation
        meshRef.current.rotation.x = time * 0.2
        meshRef.current.rotation.y = time * 0.3

        // Mouse influence
        const { x, y } = state.pointer
        const dist = new THREE.Vector3(x * 10, y * 10, 0).distanceTo(meshRef.current.position)

        if (dist < 4) {
            const dir = new THREE.Vector3().subVectors(meshRef.current.position, new THREE.Vector3(x * 5, y * 5, 0)).normalize()
            meshRef.current.position.add(dir.multiplyScalar(0.05))
        }
    })

    return (
        <Sphere args={[1, 32, 32]} position={position} scale={scale} ref={meshRef}>
            <MeshDistortMaterial
                color={color}
                envMapIntensity={1}
                clearcoat={1}
                clearcoatRoughness={0.1}
                metalness={0.1}
                roughness={0.5}
                distort={0.3}
                speed={2}
            />
        </Sphere>
    )
}

export function PlanetBalls() {
    return (
        <group>
            <FloatingBall position={[-3, 2, -2]} scale={0.8} color="#3B82F6" speed={0.5} />
            <FloatingBall position={[3, -1, -3]} scale={1.2} color="#2A2A2A" speed={0.3} />
            <FloatingBall position={[-2, -3, -5]} scale={0.6} color="#3B82F6" speed={0.7} />
            <FloatingBall position={[4, 3, -4]} scale={0.5} color="#2A2A2A" speed={0.4} />
        </group>
    )
}
