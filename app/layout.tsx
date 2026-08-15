import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Sora,
  Plus_Jakarta_Sans,
  Fira_Code,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import SmoothScroll from "@/components/layout/SmoothScroll";
import PaperTexture from "@/components/effects/PaperTexture";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fira = Fira_Code({
  variable: "--font-fira",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Gather — Events That Spark Real Connection",
  description:
    "Discover meetups, workshops, and experiences happening in your city. Join a community that gets you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${sora.variable} ${jakarta.variable} ${fira.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-cream text-warm-black">
        <SmoothScroll>
          <PaperTexture />
          <Navbar />
          <main className="flex-1 relative z-[2]">{children}</main>
          <Footer />
          <MobileNav />
        </SmoothScroll>
      </body>
    </html>
  );
}
