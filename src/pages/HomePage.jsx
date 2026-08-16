import Hero from "@/sections/HomePage/Hero";
import About from "@/sections/HomePage/About";
import Contributions from "@/sections/HomePage/Contributions";

export function HomePage() {
  return (
    <main className="w-full">
      <Hero />
      <About />
      <Contributions />
    </main>
  );
}
