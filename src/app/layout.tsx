import type { Metadata } from "next";
import "./tailwind.css";
import "./globals.scss";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/cursor/CustomCursor";

import SmoothScrolling from "@/components/ui/SmoothScrolling";

export const metadata: Metadata = {
  metadataBase: new URL("https://sajalkanwal.com"),
  title: "Sajal Kanwal — Software Engineer",
  description: "Sajal Kanwal — I'm a Software Engineer focused on building intelligent multi-agent systems and scalable real-time SaaS applications.",
  openGraph: {
    title: "Sajal Kanwal – Software Engineer",
    description: "Dharamshala-based engineer showcasing multi-agent systems and SaaS applications",
    type: "website",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sajal Kanwal – Software Engineer",
    description: "Portfolio of Sajal Kanwal. Focused on building intelligent multi-agent systems and scalable real-time SaaS applications.",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: { url: "/favicon.svg", type: "image/svg+xml" },
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
        <div className="noise-overlay pointer-events-none fixed inset-0 z-[9999] opacity-[0.03]"></div>
        <SmoothScrolling>
          <Navbar />
          <main id="container" role="main">
            {children}
          </main>
          <CustomCursor />
        </SmoothScrolling>
      </body>
    </html>
  );
}
