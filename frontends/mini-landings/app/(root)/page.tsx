"use client";
import Features from "@/components/shared/general/Features";
import HeroHome from "@/components/shared/general/HeroHome";
import ImageSwitcher from "@/components/shared/general/ImageSwitcher";
import Footer from "@/components/shared/Bottombar";

import Stats from "@/components/shared/general/Stats";

export default function Home() {
  return (
      <div className="bg-white data-scroll-container">
        <div className="flex flex-col md:flex-row">
            <HeroHome />
            <ImageSwitcher />
        </div>
        <section className="data-scroll-section">
        <Stats />
        </section>
        <section className="data-scroll-section">
          <Features />
        </section>
        <section className="data-scroll-section">
          <Footer />
        </section>

      </div>
  );
}