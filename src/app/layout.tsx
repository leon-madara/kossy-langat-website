import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const SITE_URL = "https://kossy.engineer"; // Update with actual domain

const THEME_INIT_SCRIPT = `
(() => {
  try {
    const storageKey = "kossy-theme";
    const saved = localStorage.getItem(storageKey);
    const root = document.documentElement;

    if (saved === "dark" || saved === "light") {
      root.setAttribute("data-theme", saved);
    } else {
      root.removeAttribute("data-theme");
    }
  } catch {
    // no-op: localStorage can be blocked in some environments
  }
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kossy | Structural Engineer & General Manager",
    template: "%s | Kossy",
  },
  description:
    "I don't just build structures. I build alignment between the people who make them possible. Structural engineer, General Manager, and systems orchestrator operating in East Africa.",
  keywords: [
    "structural engineer",
    "general manager",
    "East Africa",
    "construction management",
    "EPS systems",
    "women in engineering",
    "mentorship",
    "Naomi Langat",
    "Kossy",
  ],
  authors: [{ name: "Naomi 'Kossy' Lang'at Chepkoskei" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Kossy — Structural Engineer",
    title: "Kossy | Structural Engineer & General Manager",
    description:
      "I don't just build structures. I build alignment between the people who make them possible.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kossy | Structural Engineer & General Manager",
    description:
      "Structural engineer, General Manager, and systems orchestrator — building alignment across East Africa.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
