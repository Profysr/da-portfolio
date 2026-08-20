import AppShell from "@/components/layout/AppShell";
import Hero from "@/sections/HomePage/Hero";
import About from "@/sections/HomePage/About";
import TechStack from "@/sections/HomePage/TechStack";
import Experience from "@/sections/HomePage/Experience";
import Projects from "@/sections/HomePage/Projects";
import Credentials from "@/sections/HomePage/Credentials";
import FAQ from "@/sections/HomePage/FAQ";
import ActivityAndWritings from "@/sections/HomePage/Activities";

export default function HomePage() {
  return (
    <AppShell>
      <main className="w-full flex flex-col">
        <Hero />
        <About />
        <TechStack />
        <Experience />
        <Projects />
        <Credentials />
        <ActivityAndWritings />
        <FAQ />
      </main>
    </AppShell>
  );
}
