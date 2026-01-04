import { Hero } from "@/components/Hero"
import { Hero3D } from "@/components/canvas/Hero3D"
import { PlanetBalls } from "@/components/canvas/PlanetBalls"
import { Scene } from "@/components/canvas/Scene"
import { HomeContent } from "@/components/HomeContent"

import homeData from "@/data/home.json"

export default function Home() {
  const homeContent = homeData

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden text-foreground">
      <Scene>
        <Hero3D />
        <PlanetBalls />
      </Scene>
      <Hero
        name={homeContent.name}
        role={homeContent.role}
        subRole={homeContent.subRole}
        greeting={homeContent.greeting}
        lastName={homeContent.lastName}
      />

      <HomeContent homeContent={homeContent} />
    </main>
  );
}
