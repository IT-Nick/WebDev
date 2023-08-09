import Image from "next/image";
import React, { useState } from "react";

function InfoSection() {
    const totalSlides = 3;
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
    };

    const images = [
        "/assets/1.svg",
        "/assets/2.svg",
        "/assets/3.svg",
        "/assets/4.svg",
        "/assets/5.svg",
        "/assets/6.svg",
        "/assets/7.svg",
        "/assets/8.svg",
        "/assets/9.svg",
    ];

    return (
        <div id="indicators-carousel" className="relative w-800px h-800px mx-auto" data-carousel="static">
                                <div className="items-center text-center">

                                <h2 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Направления олимпиады</h2>
</div>
            <div className="relative w-800px h-800px overflow-hidden rounded-lg">
                {[0, 1, 2].map((slideIndex) => (
                    <div key={slideIndex} className={currentSlide === slideIndex ? "duration-700 ease-in-out grid grid-cols-3 gap-4" : "hidden"}>
                        {images.slice(slideIndex * 3, slideIndex * 3 + 3).map((image, index) => (
                            <Image key={index} src={image} className="block w-full" alt={`image-${index}`} width={266} height={800} />
                        ))}
                    </div>
                ))}
            </div>
            <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2 text-gray-700">
                {[0, 1, 2].map((i) => (
                    <button key={i} type="button" className="w-3 h-3 rounded-full" aria-current={i === currentSlide} aria-label={`Slide ${i + 1}`} data-carousel-slide-to={i}></button>
                ))}
            </div>
            <button type="button" onClick={prevSlide} className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                </svg>
                <span className="sr-only">Назад</span>
            </span>
            </button>
            <button type="button" onClick={nextSlide} className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="sr-only">Вперед</span>
            </span>
            </button>
        </div>
    );
}

export default InfoSection;