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
<div className="main-container-hero">
  <div className="container-hero container-text-button-hero">
    <div className="hero-title-container">
      <h1 className={`hero-title ${!loading && titleAnimation ? 'animate-hero-title' : 'initial-offscreen'}`}>
        Создавай будущее
      </h1>
    </div>
    <div className="sub-title-container">
      <h1 className={`sub-title-gradient ${!loading ? 'animate-sub-title-gradient' : ''}`}>вместе с нами!</h1>
    </div>
    <div className="sub-title">
      <button className={`px-20 py-6 text-4xl font-bold text-rose-400 border border-rose-600 hover:bg-rose-600 hover:text-white focus:outline-none focus:ring active:bg-rose-500 ${!loading && subTitleAnimation ? 'animate-sub-title' : 'initial-hidden'}`}>
        Присоединиться
      </button>
    </div>
  </div>
  <div className="container-hero container-image-hero">
    <Image src="/heroimg.svg" alt="Next Image" width={600} height={600} className={`svg-icon ${!loading && subTitleAnimation ? 'animate-svg-icon' : 'initial-offscreen-right'}`} />
  </div>
</div>

  );
}