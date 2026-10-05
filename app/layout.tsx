import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  keywords: [
    "AI Automation Specialist",
    "Full-Stack Developer",
    "App Developer",
    "Workflow Automation",
    "AI Agents",
    "Next.js Developer",
    "Muhammad Hamdan",
    "Hami",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    type: "website",
    locale: "en_US",
    siteName: "HAMI — Muhammad Hamdan",
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  alternateName: "Hami",
  jobTitle: "AI Automation Specialist & Full-Stack Developer",
  email: `mailto:${SITE.email}`,
  url: SITE.url,
  description: SITE.description,
  knowsAbout: [
    "AI Automation",
    "Workflow Automation",
    "AI Agents",
    "Full-Stack Web Development",
    "Web Application Development",
    "App Development",
    "Next.js",
    "TypeScript",
    "n8n",
    "RAG",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
