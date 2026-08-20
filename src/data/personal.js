import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
  IconClock,
  IconFolderCode,
  // IconActivity,
  // IconRobot,
} from "@tabler/icons-react";

export const socials = [
  {
    platform: "github",
    icon: IconBrandGithub,
    url: "https://github.com/Profysr",
    label: "GitHub",
    handle: "@Profysr",
    aria: "github",
  },
  {
    platform: "linkedin",
    icon: IconBrandLinkedin,
    url: "https://linkedin.com/in/",
    label: "LinkedIn",
    handle: "Bilal Ahmad",
    aria: "linkedin",
  },
  {
    platform: "x",
    icon: IconBrandX,
    url: "https://x.com/",
    label: "X (Twitter)",
    handle: "@bilalahmad_dev",
    aria: "x",
  },
  {
    platform: "email",
    icon: IconMail,
    url: "mailto:hello@da-portfolio.dev",
    label: "Email",
    handle: "hello@da-portfolio.dev",
    aria: "email",
  },
];

export const personal = {
  name: "Bilal Ahmad",
  tagline: "Forward Deployed & Software Engineer",
  bio: `I turn raw data into decisions and automate complex engineering workflows. 
        Specializing in scalable system architecture, full-stack intelligence, 
        MCP-driven agentic pipelines, and autonomous tooling.`,
  avatar: "/avatar.jpg",
  logo: "/sig.png",
  location: "Pakistan",
  locationLabel: "Islamabad, PK → Worldwide",
  timezone: "GMT+5",
  email: "hello@da-portfolio.dev",
  resumeUrl: "/Resume Bilal Ahmad.pdf",
  socials,
};

export const about = {
  heading: "About Me",
  subheading:
    "A look into my background, core engineering pillars, and focus areas.",
  stats: [
    {
      id: "industry",
      title: "In Industry",
      value: "2 Yrs 8 Mos",
      subtext: "Experience",
      icon: IconClock,
      spanClass:
        "col-span-12 sm:col-span-6 md:col-span-2 md:row-span-2 md:col-start-9 md:row-start-1",
    },
    {
      id: "projects",
      title: "Projects Built",
      value: "40+",
      subtext: "Delivered",
      icon: IconFolderCode,
      isCompact: true,
      spanClass:
        "col-span-12 sm:col-span-6 md:col-span-2 md:row-span-1 md:col-start-11 md:row-start-1",
    },
  ],
};