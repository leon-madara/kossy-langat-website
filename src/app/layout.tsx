import type { Metadata } from "next";
import { Inter, Playfair_Display, Instrument_Serif } from "next/font/google";
import { ScrollMicroPin } from "@/components/layout/ScrollMicroPin";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const SITE_URL = "https://naomilangat.engineer"; // Update with actual domain

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
    "structural engineer Nairobi",
    "structural engineering Kenya",
    "general manager",
    "East Africa",
    "construction management",
    "construction management Nairobi",
    "EPS 3D Kenya",
    "EPS panel systems Kenya",
    "EPS systems",
    "women in engineering",
    "mentorship",
    "Naomi Lang'at Chepkoskei",
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
    images: [
      {
        url: "/images/hero/6dea.png",
        width: 1200,
        height: 800,
        alt: "Kossy — Structural Engineer reviewing blueprints in Nairobi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kossy | Structural Engineer & General Manager",
    description:
      "Structural engineer, General Manager, and systems orchestrator — building alignment across East Africa.",
    images: ["/images/hero/6dea.png"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://naomilangat.engineer/#person",
                  "name": "Naomi Lang'at Chepkoskei",
                  "alternateName": "Kossy",
                  "jobTitle": "General Manager",
                  "worksFor": { "@id": "https://naomilangat.engineer/#org" },
                  "knowsAbout": [
                    "Structural Engineering",
                    "EPS 3D Panel Systems",
                    "Construction Management"
                  ],
                  "url": "https://naomilangat.engineer/about"
                },
                {
                  "@type": "Organization",
                  "@id": "https://naomilangat.engineer/#org",
                  "name": "EPS Manufacturing & Supply Kenya",
                  "url": "https://naomilangat.engineer",
                  "areaServed": "KE",
                  "description": "EPS 3D panel system installation and structural engineering services across Kenya and East Africa."
                },
                {
                  "@type": "WebSite",
                  "@id": "https://naomilangat.engineer/#website",
                  "url": "https://naomilangat.engineer",
                  "name": "Kossy — Structural Engineer",
                  "publisher": { "@id": "https://naomilangat.engineer/#person" }
                }
              ]
            })
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@100..900&family=Euphoria+Script&family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${instrumentSerif.variable} antialiased`}
      >
        {children}
        <ScrollMicroPin />
      </body>
    </html>
  );
}
