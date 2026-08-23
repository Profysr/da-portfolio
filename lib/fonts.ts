import { Geist_Mono, Poppins } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  variable: "--font-poppins",
  fallback: ["system-ui", "sans-serif"],
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-geist-mono",
  fallback: ["ui-monospace", "Menlo", "monospace"],
});

export const fontStacks = {
  sans: 'var(--font-poppins), "Poppins", system-ui, sans-serif',
  mono: 'var(--font-geist-mono), "Geist Mono", ui-monospace, Menlo, monospace',
};
