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
        className="fixed top-0 left-0 w-full z-50"
      >
        <div className="container mx-auto py-2 flex items-center justify-between">
          <div className={`${scrolling ? 'move-up-logo' : ''}`}>
          <Link href="/">
                <Image 
                  src="/assets/PreLogo.svg" 
                  alt="Logo" 
                  width={150}
                  height={150}
                  className={logoClass}
                />
            </Link>
          </div>
          <div className="lg:hidden">
            {/* Мобильное меню */}
          </div>
          <div className={`${scrolling ? 'move-up-menu' : ''}`}>
            <Menu />
          </div>
        </div>
      </nav>
  );
}
