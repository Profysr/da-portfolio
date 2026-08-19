import {
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