"use client";
import { useEffect, useState } from "react";
import { useLoading } from '@/components/Providers/LoadingProvider'
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolling ? "bg-opacity-50 bg-white" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-6 py-2 flex items-center justify-between">
        <div className="transition-all duration-300 ease-in-out transform-gpu">
        <img src="/assets/PreLogo.svg" className={logoClass} alt="Logo" />
        </div>
        <div className="lg:hidden">
          {/* Мобильное меню */}
        </div>
        <ul className="hidden lg:flex lg:items-center lg:w-auto lg:space-x-12">
          <li>
            <a className="text-sm" href="#">
              Блог
            </a>
          </li>
          <li>
            <a className="text-sm" href="#">
              Мероприятия
            </a>
          </li>
          {/* дополнительные пункты */}
        </ul>
      </div>
    </nav>
  );
}
