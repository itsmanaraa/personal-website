"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, Preload } from "@react-three/drei"
import { Suspense } from "react"

export function Scene({ children }: { children: React.ReactNode }) {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <Environment preset="studio" />
                    {children}
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    )
}
