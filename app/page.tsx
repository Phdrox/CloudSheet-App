
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Pricing } from "@/components/Pricing";
import { Technologies } from "@/components/Technologies";
import Image from "next/image";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-background">
       <Navbar />
      <Hero />
      <Features />
      <Technologies />
      <Pricing />
      <Footer />
    </main>
  );
}
