"use client";
import { useEffect, useState } from 'react';
import Loader from '@/components/shared/Loader/Loader'
import './Page.css';
import { useLoading } from '@/components/Providers/LoadingProvider'
import Footer from '@/components/Root/Footer' 
import SwipeCard from '@/components/shared/events/SwipeCard' 
import StaticCard from '@/components/shared/events/StaticCard' 

const data = ['Card 1', 'Card 2', 'Card 3', 'Card 4'];


export default function Home() {

  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleSwipeLeft = () => {
    setIndex((prev) => (prev + 1) % data.length);
  };

  const handleSwipeRight = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIndex((prev) => (prev + 1) % data.length);
  };

  const handleMoreInfo = () => {
    // Логика для кнопки "Подробнее"
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

  return (
    <>
      <div className={`loader-container ${loading ? '' : 'fade-out'}`}>
        <Loader />
      </div>



      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
{/* Mobile layout */}
<div className="md:hidden w-full h-screen relative">
  {(index + 1) < data.length && (
    <div className="absolute w-full h-full">
      <SwipeCard
        content={data[index + 1]}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        onClickMore={handleMoreInfo}
      />
    </div>
  )}
  {index < data.length && (
    <div className="absolute w-full h-full">
      <SwipeCard
        content={data[index]}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        onClickMore={handleMoreInfo}
      />
    </div>
  )}
</div>
  {/* Desktop layout */}
  <div className="mobile-hidden">
    <div className="flex flex-wrap">
      {data.map((card, idx) => (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4">
          <StaticCard key={idx} content={card} onClickMore={handleMoreInfo} />
        </div>
      ))}
    </div>
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




      <div className="mobile-hidden bg-blue-100 w-full">
        <footer className="w-full min-h-screen">
          <Footer />
        </footer>
      </div>
    </>
  );
}
