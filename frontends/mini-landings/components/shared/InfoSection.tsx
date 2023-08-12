"use client";

import React, { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

type CarouselProps = {
  images: string[];
};

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

function SamplePrevArrow(props: ArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray" }}
      onClick={onClick}
    />
  );
}

function SampleNextArrow(props: ArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray" }}
      onClick={onClick}
    />
  );
}

function Carousel({ images }: CarouselProps) {
  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 3.5,  // Показывает 3 полные карточки и одну наполовину
    slidesToScroll: 1,
    draggable: true,
    swipeToSlide: true,
    centerMode: false,  // Центрирует текущий слайд
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768, // на экранах меньше 768px
        settings: {
          slidesToShow: 1.5, // показывать 1 карточку и половину следующей
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="relative w-full overflow-hidden">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="p-2">
            <div className="shadow-md rounded-xl m-2 border border-gray-100">
              <Image src={image} alt={`image-${index}`} width={500} height={500} className="rounded-xl" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

function InfoSection() {
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
    <div className="relative w-full h-auto mx-auto p-8">
      <h2 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 text-center">Направления олимпиады</h2>
      <Carousel images={images} />
    </div>
  );
}

export default InfoSection;
