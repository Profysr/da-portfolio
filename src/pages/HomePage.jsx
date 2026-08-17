import Hero from "@/sections/HomePage/Hero";
import About from "@/sections/HomePage/About";
import { TechStack } from "@/sections/HomePage/TechStack";
import { Experience } from "@/sections/HomePage/Experience";
import { Projects } from "@/sections/HomePage/Projects";
import { Credentials } from "@/sections/HomePage/Credentials";
import { FAQ } from "@/sections/HomePage/FAQ";

export function HomePage() {
  return (
    <main className="w-full flex flex-col">
      {/* 1. Hero (Tone A: Deep Space) */}
      <div className="relative w-full">
        <Hero />
      </div>

      {/* 2. About & GitHub (Tone B: Elevated Surface) */}
      <div className="relative w-full bg-surface border-y border-white/5">
        <About />
      </div>

      {/* 3. Tech Stack (Tone A: Deep Space) */}
      <div className="relative w-full">
        <TechStack />
      </div>

      {/* 4. Experience (Tone B: Elevated Surface) */}
      <div className="relative w-full bg-surface border-y border-white/5">
        <Experience />
      </div>

      {/* 5. Projects (Tone A: Deep Space) */}
      <div className="relative w-full">
        <Projects />
      </div>

      {/* 6. Credentials (Tone B: Elevated Surface) */}
      <div className="relative w-full bg-surface border-y border-white/5">
        <Credentials />
      </div>

      {/* 7. FAQ (Tone A: Deep Space) */}
      <div className="relative w-full">
        <FAQ />
      </div>
    </main>
  );
}

export default HomePage;
