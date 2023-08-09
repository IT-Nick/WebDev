"use client";
import Layout from "@/components/components/layout";
import Features from "@/components/components/layout/Features";
import HeroHome from "@/components/components/partials/HeroHome";
import ImageSwitcher from "@/components/components/home/ImageSwitcher";
import Footer from "@/components/components/layout/Footer";

import Stats from "@/components/components/layout/Stats";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        <HeroHome />
        <ImageSwitcher />
      </div>
      <Stats />
      <Features />
      {/* <Testimotals /> */}
      <Footer />
    </Layout>
  );
}