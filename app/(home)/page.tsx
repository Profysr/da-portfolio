import HomeLayout from "@/components/layout/HomeLayout";
import Hero from "@/app/(home)/_components/Hero";
import About from "@/app/(home)/_components/About";
import TechStack from "@/app/(home)/_components/TechStack";
import Experience from "@/app/(home)/_components/Experience";
import Projects from "@/app/(home)/_components/Projects";
import Credentials from "@/app/(home)/_components/Credentials";
import FAQ from "@/app/(home)/_components/FAQ";
import ActivityAndWritings from "@/app/(home)/_components/Activities";

export default function HomePage() {
  return (
    <HomeLayout>
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
    </HomeLayout>
  );
}
