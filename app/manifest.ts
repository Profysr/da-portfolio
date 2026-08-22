import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bilal Ahmad — Software & Forward Deployed Engineer",
    short_name: "Bilal Ahmad",
    description:
      "Portfolio of Bilal Ahmad: Forward Deployed Engineer, Engineering Lead, and Full-Stack AI Developer.",
    start_url: "/",
    display: "standalone",
    background_color: "#141414",
    theme_color: "#d4a800",
    orientation: "portrait-primary",
    scope: "/",
    icons: [
      {
        src: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["portfolio", "developer", "software"],
    screenshots: [],
    shortcuts: [
      {
        name: "Projects",
        short_name: "Projects",
        description: "View my engineering projects",
        url: "/#projects",
        icons: [{ src: "/favicon-32x32.png", sizes: "32x32" }],
      },
      {
        name: "Writing",
        short_name: "Writing",
        description: "Read my technical writings",
        url: "/#activity-writings",
        icons: [{ src: "/favicon-32x32.png", sizes: "32x32" }],
      },
      {
        name: "Contact",
        short_name: "Contact",
        description: "Get in touch",
        url: "/#contact",
        icons: [{ src: "/favicon-32x32.png", sizes: "32x32" }],
      },
    ],
  };
}