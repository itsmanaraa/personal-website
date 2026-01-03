import { Hero } from "@/components/Hero"
import { Hero3D } from "@/components/canvas/Hero3D"
import { Scene } from "@/components/canvas/Scene"

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <Scene>
        <Hero3D />
      </Scene>
      <Hero />
      <div className="h-screen w-full"></div> {/* Spacer for scroll testing */}
    </main>
  );
}
