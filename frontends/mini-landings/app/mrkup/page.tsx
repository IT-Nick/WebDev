"use client";
import { useEffect } from 'react';
import Loader from '@/components/shared/Loader/Loader'
import './Page.css';
import { useLoading } from '@/components/Providers/LoadingProvider'
import Footer from '@/components/Root/Footer' 
export default function Home() {
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
            

      <div className="bg-white w-full">
        <footer className="w-full min-h-screen">
          <Footer />
        </footer>
      </div>
    </>
  );
}
