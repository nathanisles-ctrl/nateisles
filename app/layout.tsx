import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "NATE ISLES — Football × AI",
  description:
    "Former NFL, CFL and Arena offensive lineman building with AI. OL Mastery coaching, AI films, music and tools.",
  openGraph: {
    title: "NATE ISLES",
    description: "Football × AI. Ex-pro lineman building with AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-obsidian text-bone font-body min-h-screen">
        <CustomCursor />
        <Nav />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
