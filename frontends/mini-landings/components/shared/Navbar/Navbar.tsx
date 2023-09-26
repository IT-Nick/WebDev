"use client";
import { useEffect, useState } from "react";
import { useLoading } from '@/components/Providers/LoadingProvider'
import Menu from '@/components/shared/Navbar/Menu/menu'
import Link from 'next/link';
import Image from 'next/image';

import './Navbar.css';

export default function Navbar() {
  const [scrolling, setScrolling] = useState(false);
  const { loading } = useLoading();
  // В зависимости от состояния загрузки вы можете изменять стили или классы
  const logoClass = loading ? 'loading-logo' : 'loaded-logo';

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 mt-4 ml-4 mr-4 pt-2"
    >
      <div className="container flex items-center justify-between">
        <div className={`${scrolling ? 'flex-shrink-0 absolute top-0 left-0 mt-4' : 'flex-shrink-0 absolute top-0 left-0 mt-4'} d-flex align-items-center justify-content-center`} style={{ width: '60px', height: '60px' }}>
          <Link href="/">
            {/* Белый круг на фоне */}
            <svg width="60" height="60" style={{ position: 'absolute', zIndex: 1, transform: 'translateY(-10px)' }}>
              <circle cx="30" cy="30" r="30" fill="white" />
            </svg>

            {/* Логотип */}
            <Image
              src="/assets/PreLogo.svg"
              alt="Logo"
              width={45}  // изменена ширина логотипа
              height={45} // изменена высота логотипа
              style={{ position: 'relative', zIndex: 2, transform: 'translateX(8px)' }}
            />
          </Link>
        </div>




        <div className={`${scrolling ? 'flex-shrink-0 absolute top-0 right-0' : 'flex-shrink-0 absolute top-0 right-0'}`}>
          <Menu />
        </div>
      </div>
    </nav>
  );
}