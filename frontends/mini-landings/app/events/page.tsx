"use client";
import { useEffect, useState } from 'react';
import Loader from '@/components/shared/Loader/Loader'
import './Page.css';
import { useLoading } from '@/components/Providers/LoadingProvider'
import Footer from '@/components/Root/Footer'
import SwipeCard from '@/components/shared/events/SwipeCard'
import StaticCard from '@/components/shared/events/StaticCard'

const data = [
  {
    image: '/assets/img/bg_2.svg',
    title: 'Card 1',
    description: 'This is card 1',
  },
  {
    image: '/assets/img/bg_3.svg',
    title: 'Card 2',
    description: 'This is card 2',
  },
  {
    image: '/assets/img/bg_4.svg',
    title: 'Card 3',
    description: 'This is card 3',
  },
  {
    image: '/assets/img/bg_4.svg',
    title: 'Card 4',
    description: 'This is card 4',
  },
];

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [index, setIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handleSwipeLeft = () => {
    setIndex(nextIndex);
    setNextIndex((nextIndex + 1) % data.length);
  };

  const handleSwipeRight = () => {
    setShowModal(true);
    setIndex(nextIndex);
    setNextIndex((nextIndex + 1) % data.length);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const { loading, setLoading } = useLoading();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleMoreInfo = () => {
    console.log('Clicked More Info');
  };
  

  return (
    <>
      <div className={`loader-container ${loading ? '' : 'fade-out'}`}>
        <Loader />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
        <div className="md:hidden w-full h-screen relative">
          {index < data.length && (
            <div className="absolute w-full h-full">
<SwipeCard
  cardInfo={data[index]}
  onSwipeLeft={handleSwipeLeft}
  onSwipeRight={handleSwipeRight}
  onClickMore={handleMoreInfo} // <- Этот проп должен быть передан, так как он указан как обязательный
/>
            </div>
          )}
          {nextIndex < data.length && (
            <div className="absolute w-full h-full">
<SwipeCard
  cardInfo={data[index]}
  onSwipeLeft={handleSwipeLeft}
  onSwipeRight={handleSwipeRight}
  onClickMore={handleMoreInfo} // <- Этот проп должен быть передан, так как он указан как обязательный
/>
            </div>
          )}
        </div>
        <div className="hidden md:flex flex-wrap">
          {data.map((card, idx) => (
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4">
<StaticCard 
  key={idx} 
  cardInfo={card} 
  onClickMore={handleMoreInfo}
/>            </div>
          ))}
        </div>
        {showModal && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <input
                type="email"
                placeholder="Your email"
                className="border p-2 rounded mb-2"
              />
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={closeModal}
              >
                Subscribe
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="hidden md:block bg-blue-100 w-full">
        <footer className="w-full min-h-screen">
          <Footer />
        </footer>
      </div>
    </>
  );
}