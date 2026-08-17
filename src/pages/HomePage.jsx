import Hero from "@/sections/HomePage/Hero";
import About from "@/sections/HomePage/About";
import Contributions from "@/sections/HomePage/Contributions";
import { Experience } from "@/sections/HomePage/Experience";
import { FAQ } from "@/sections/HomePage/FAQ";

export function HomePage() {
  return (
    <main className="w-full">
      <Hero />
      <About />
      <Contributions />
      <Experience />
      <FAQ />
    </main>
  );
}
