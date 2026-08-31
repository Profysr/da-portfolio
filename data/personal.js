import {
  IconClock,
  IconFolderCode,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
} from "@tabler/icons-react";

export const socials = [
  {
    platform: "github",
    icon: IconBrandGithub,
    url: "https://github.com/Profysr",
    label: "GitHub",
    handle: "@Profysr",
    aria: "github",
    color: "#FFFFFF",
    hoverColor: "#FFFFFF",
  },
  {
    platform: "linkedin",
    icon: IconBrandLinkedin,
    url: "https://www.linkedin.com/in/bilalahmad072/",
    label: "LinkedIn",
    handle: "Bilal Ahmad",
    aria: "linkedin",
    color: "#0A66C2",
    hoverColor: "#004182",
  },
  {
    platform: "x",
    icon: IconBrandX,
    url: "https://x.com/_BilalAhme",
    label: "X (Twitter)",
    handle: "@_BilalAhme",
    aria: "x",
    color: "#FFFFFF",
    hoverColor: "#FFFFFF",
  },
  {
    platform: "email",
    icon: IconMail,
    url: "mailto:bilal072ahmad@gmail.com",
    label: "Email",
    handle: "bilal072ahmad@gmail.com",
    aria: "email",
    color: "#EA4335",
    hoverColor: "#D93025",
  },
];

export const ROLES = ["Software Engineer", "Forward Deployed", "Full Stack Eng"];

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
  githubUsername: "Profysr",
  email: "bilal072ahmad@gmail.com",
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
    },
    {
      id: "projects",
      title: "Projects Built",
      value: "40+",
      subtext: "Delivered",
      icon: IconFolderCode,
      isCompact: true,
    },
  ],
};

export const websiteDomain = "https://profysr.vercel.app/";
