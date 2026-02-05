import Head from "next/head";
import { Geist } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/landing/Hero";
import { TopicsGrid } from "@/components/landing/TopicsGrid";
import { Benefits } from "@/components/landing/Benefits";
import { Footer } from "@/components/landing/Footer";
import { ThreeBackground } from "@/components/ThreeBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>
          VibeCodeee - Premium Community Platform | Connect & Grow Together
        </title>
        <meta
          name="description"
          content="Join our exclusive premium community platform. Access expert resources, AI tools, prompting guides, and connect with like-minded professionals. Start your journey today."
        />
        <meta
          property="og:title"
          content="VibeCodeee - Premium Community Platform | Connect & Grow Together"
        />
        <meta property="og:url" content="https://vibecodeee.com" />
        <meta
          name="twitter:title"
          content="VibeCodeee - Premium Community Platform"
        />
      </Head>
      <div className={`${geistSans.variable} font-sans relative`}>
        {/* Three.js Background for entire homepage */}
        <ThreeBackground />
        
        {/* Grid Pattern overlay for entire page */}
        <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#d4d4d8_1px,transparent_1px),linear-gradient(to_bottom,#d4d4d8_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40 pointer-events-none"></div>
        
        <div className="relative z-10">
          <Header />
          <Hero />
          <TopicsGrid />
          <Benefits />
          <Footer />
        </div>
      </div>
    </>
  );
}
