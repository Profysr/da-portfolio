import HomeLayout from "@/components/layout/HomeLayout";
import Hero from "@/app/(home)/_components/Hero"
import About from "@/app/(home)/_components/About";
import TechStack from "@/app/(home)/_components/TechStack";
import Experience from "@/app/(home)/_components/Experience";
import Projects from "@/app/(home)/_components/Projects";
import Credentials from "@/app/(home)/_components/Credentials";
import Writings from "@/app/(home)/_components/Writings";
import FAQ from "@/app/(home)/_components/FAQ";
import { generateProfilePageSchema } from "@/lib/structured-data";
import Script from "next/script";

export default function HomePage() {
  const profilePageSchema = generateProfilePageSchema();

  return (
    <HomeLayout>
      <Script
        id="json-ld-profile-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <div className="w-full flex flex-col">
        <Hero />
        <About />
        <TechStack />
        <Experience />
        <Projects />
        <Credentials />
        <Writings />
        <FAQ />
      </div>
    </HomeLayout>
  );
}
