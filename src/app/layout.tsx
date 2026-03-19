import type { Metadata } from "next";
import "./tailwind.css";
import "./globals.scss";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/cursor/CustomCursor";

export const metadata: Metadata = {
  title: "Sajal Kanwal — Branding Designer",
  description: "Sajal Kanwal — I'm a branding & UX/UI designer focused on typography, systems, and thoughtful digital experiences.",
  openGraph: {
    title: "Sajal Kanwal – Branding & UX/UI Designer",
    description: "Dharamshala-based designer showcasing branding & UX/UI work",
    type: "website",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sajal Kanwal – Designer & Developer",
    description: "Portfolio of Sajal Kanwal. Focused on typography, systems, and thoughtful digital experiences.",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body id="content-wrapper" className="scroll-container" suppressHydrationWarning>
        <Navbar />
        <main id="container" role="main">
          {children}
        </main>
        <CustomCursor />
      </body>
    </html>
  );
}
