import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Providers } from "@/app/providers";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  generatePersonSchema,
  generateWebSiteSchema,
} from "@/lib/structured-data";
import { websiteDomain } from "@/data/personal";
import { geistMono, poppins } from "@/utils/fonts";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FDFBF7" },
    { media: "(prefers-color-scheme: dark)", color: "#141414" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(websiteDomain),
  title: {
    default: "Bilal Ahmad — Software & Forward Deployed Engineer",
    template: "%s | Bilal Ahmad",
  },
  description:
    "Portfolio of Bilal Ahmad: Forward Deployed Engineer, Engineering Lead, and Full-Stack AI Developer.",
  keywords: [
    "Software Engineer",
    "Forward Deployed Engineer",
    "Engineering Lead",
    "Full-Stack Developer",
    "AI/ML Engineer",
    "Automation",
    "DevOps",
    "System Architecture",
    "Portfolio",
  ],
  authors: [{ name: "Bilal Ahmad", url: "https://github.com/Profysr" }],
  creator: "Bilal Ahmad",
  publisher: "Bilal Ahmad",
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: websiteDomain,
    siteName: "Bilal Ahmad",
    title: "Bilal Ahmad — Software & Forward Deployed Engineer",
    description:
      "Portfolio of Bilal Ahmad: Forward Deployed Engineer, Engineering Lead, and Full-Stack AI Developer.",
    images: [
      {
        url: `/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Bilal Ahmad - Forward Deployed Engineer & Software Lead",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bilal Ahmad — Software & Forward Deployed Engineer",
    description:
      "Portfolio of Bilal Ahmad: Forward Deployed Engineer, Engineering Lead, and Full-Stack AI Developer.",
    images: [`/og-image.png`],
    creator: "@_BilalAhme",
  },
  icons: {
    icon: [
      { url: "/favico/favicon.ico", sizes: "any" },
      { url: "/favico/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favico/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favico/favicon.ico",
    apple: [
      {
        url: "/favico/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/favico/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personSchema = generatePersonSchema();
  const webSiteSchema = generateWebSiteSchema();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          id="json-ld-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          id="json-ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <link rel="preconnect" href="https://github.com" />
        <link rel="dns-prefetch" href="https://github.com" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        {/* Accessibility landmark for keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Providers>
          <TooltipProvider>
            <main id="main-content" className="flex-1">
              {children}
            </main>
          </TooltipProvider>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
