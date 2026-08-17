import Hero from "@/sections/HomePage/Hero";
import About from "@/sections/HomePage/About";
import Contributions from "@/sections/HomePage/Contributions";
import { FAQ } from "@/components/FAQ";

export function HomePage() {
  return (
    <main className="w-full">
      <Hero />
      <About />
      <Contributions />
      <FAQ />
    </main>
  );
}
