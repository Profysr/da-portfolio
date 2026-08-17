import Hero from "@/sections/HomePage/Hero";
import About from "@/sections/HomePage/About";
import Contributions from "@/sections/HomePage/Contributions";
import { Experience } from "@/sections/HomePage/Experience";
import { FAQ } from "@/sections/HomePage/FAQ";
import { Education } from "@/sections/HomePage/Education";
import { Certificates } from "@/sections/HomePage/Certificates";

export function HomePage() {
  return (
    <main className="w-full">
      <Hero />
      <About />
      <Contributions />
      <Experience />
      <Education />
      <Certificates />
      <FAQ />
    </main>
  );
}
