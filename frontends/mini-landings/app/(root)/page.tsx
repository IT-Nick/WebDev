"use client";
import Features from "@/components/shared/general/Features";
import HeroHome from "@/components/shared/general/HeroHome";
import ImageSwitcher from "@/components/shared/general/ImageSwitcher";
import Footer from "@/components/shared/Bottombar";

import Stats from "@/components/shared/general/Stats";


export default function Home() {
  return (
      <div className="bg-white">
        <div className="flex flex-col md:flex-row">
          
          <HeroHome />
          <ImageSwitcher />
        </div>
        <Stats />
        <Features />
        <Footer />
      </div>
  );
}