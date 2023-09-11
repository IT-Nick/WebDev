"use client";
import { useEffect, useState } from 'react';
import Loader from '@/components/shared/Loader/Loader'
import Hero from '@/components/Root/Hero'
import './Page.css';
import { useLoading } from '@/components/Providers/LoadingProvider'
import Footer from '@/components/Root/Footer' 
import Atom from '@/components/Root/Atom' 
import Features from '@/components/Root/Features';

export default function Home() {
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    const handleScroll = () => {
      const sections = document.querySelectorAll('.data-scroll-section');
      const container = document.querySelector('.data-scroll-container') as HTMLElement;
      
      let firstSectionIsInView = false;

      sections.forEach((section: Element, index: number) => {
        const rect = (section as HTMLElement).getBoundingClientRect();
        const sectionMiddle = rect.top + rect.height / 2;

        if (index === 0) {
          firstSectionIsInView = rect.top <= window.innerHeight && rect.bottom >= 0;
        }

        if (sectionMiddle >= 0 && sectionMiddle <= window.innerHeight) {
          switch (index) {
            case 1:
            case 2:
            case 3:
              container.style.backgroundColor = '#ffffff';
              break;
            case 4:
              container.style.backgroundColor = '#5d5eb1';
              break;
            default:
              break;
          }
          container.style.transition = 'background-color 0.5s';
        }
      });

      if (firstSectionIsInView) {
        container.style.backgroundColor = 'white';
        container.style.transition = 'background-color 0.5s';
      }
    };

    const adjustSectionHeight = () => {
      const sections = document.querySelectorAll('.data-scroll-section');
      sections.forEach((section: Element) => {
        const contentHeight = (section as HTMLElement).scrollHeight;
        (section as HTMLElement).style.minHeight = `${contentHeight}px`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', adjustSectionHeight);
    window.addEventListener('DOMContentLoaded', adjustSectionHeight);

    adjustSectionHeight();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', adjustSectionHeight);
      window.removeEventListener('DOMContentLoaded', adjustSectionHeight);
    };
  }, []);

  return (
    <>
      <div className={`loader-container ${loading ? '' : 'fade-out'}`}>
        <Loader />
      </div>
            

      <div className="bg-white data-scroll-container transition-all duration-500 ease-in-out w-full">
        <section className="data-scroll-section w-full min-h-screen">
          <Hero loading={loading} />
        </section>
        <section className="data-scroll-section flex justify-center items-center w-full min-h-screen">
          <Atom />
        </section>
        <section className="data-scroll-section w-full min-h-screen">
        <Features />
        </section>
        <section className="data-scroll-section w-full min-h-screen">
          <h1></h1>
        </section>
        <footer className="data-scroll-section w-full min-h-screen">
          <Footer />
        </footer>
      </div>
    </>
  );
}
