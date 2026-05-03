import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "NATE ISLES — Building what didn't exist yesterday.",
  description:
    "AI cinema, original music, software, and the craft of the offensive line. Force, in every form.",
  openGraph: {
    title: "NATE ISLES",
    description: "Building what didn't exist yesterday.",
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
