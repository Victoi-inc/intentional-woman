import type { Metadata } from "next";
import { SiteNavbar } from "@/components/nav/site-navbar";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.iwomanlife.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "INTENTIONAL WOMAN",
    template: "%s | INTENTIONAL WOMAN",
  },
  description: "Empowering Women to Thrive",
  // app/favicon.ico is served at /favicon.ico. Keep this in sync so metadata
  // does not override it with a broken or stale URL (tabs cache favicons aggressively).
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "INTENTIONAL WOMAN",
    title: "INTENTIONAL WOMAN",
    description: "Empowering Women to Thrive",
    images: [
      {
        url: "/images/iwoman-logo.jpeg",
        alt: "INTENTIONAL WOMAN",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "INTENTIONAL WOMAN",
    description: "Empowering Women to Thrive",
    images: ["/images/iwoman-logo.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <SiteNavbar />
        {children}
      </body>
    </html>
  );
}
