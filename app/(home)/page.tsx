import HomeLayout from "@/components/layout/HomeLayout";
import Hero from "@/app/(home)/_components/Hero"
import About from "@/app/(home)/_components/About";
import TechStack from "@/app/(home)/_components/TechStack";
import Experience from "@/app/(home)/_components/Experience";
import Projects from "@/app/(home)/_components/Projects";
import Credentials from "@/app/(home)/_components/Credentials";
import Writings from "@/app/(home)/_components/Writings";
import FAQ from "@/app/(home)/_components/FAQ";

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
        <Writings />
        <FAQ />
      </main>
    </HomeLayout>
  );
}
