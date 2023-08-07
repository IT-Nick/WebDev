import Layout from "@/components/layout";
import Features from "@/components/layout/Features";
import HeroHome from "@/components/partials/HeroHome";
import ImageSwitcher from "@/components/home/ImageSwitcher";
import Footer from "@/components/layout/Footer";

import Stats from "@/components/layout/Stats";

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