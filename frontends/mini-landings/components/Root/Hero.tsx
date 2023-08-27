import React, { useEffect, useState } from 'react';
import './Hero.css';
import Image from 'next/image';

interface HeroProps {
  loading: boolean;
}

export default function Hero({ loading }: HeroProps) {
  const [titleAnimation, setTitleAnimation] = useState(false);
  const [subTitleAnimation, setSubTitleAnimation] = useState(false);

  useEffect(() => {
    if (!loading) {
      setTitleAnimation(true);
      const timer = setTimeout(() => {
        setSubTitleAnimation(true);
      }, 2000); // 2 second delay to match the first title's animation duration

      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <div className="data-scroll-section w-full h-screen relative">
        {titleAnimation && (
            <div className="hero-title">
            <div>Создавай будущее</div>
            <div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-400">
                вместе с нами!
                </span>
            </div>
            </div>
        )}
      {subTitleAnimation && (
          <span className="sub-title text-rose-400 underline hover:no-underline text-xl font-bold md:text-2xl lg:text-4xl my-2 md:my-0 md:mx-4">
            Присоединиться
          </span>
      )}
      {subTitleAnimation && (
        <div className="svg-icon">
          <Image 
            src="/heroimg.svg" 
            alt="Next Image" 
            width={600}  // Your width here
            height={600}  // Your height here
          />
        </div>
        )}
    </div>
  );
}