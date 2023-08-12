"use client";
import React, { useState } from "react";

function HelloSection() {
  const [modalContent, setModalContent] = useState<string | null>(null);

  const cards = [
    {
      title: "Диплом",
      content: "Диплом позволяет претендовать на льготы при поступлении в ведущие вузы страны",
      link: "/docs#комьюнити"
    },
    {
      title: "Стажировка",
      content: "Дипломанты могут пройти стажировку в крупной российской компании",
      link: "/docs#менторство-участников"
    },
    {
      title: "Денежная премия",
      content: "Премии предусмотрены для сильнейших участников — медалистов...",
      link: "/docs#коворкинг"
    },
    {
      title: "Центр карьеры",
      content: "На два сезона олимпиады дипломанты получают доступ...",
      link: "/docs#без-операционной-работы"
    }
  ];

  const cardStyles = [
    {
        bgElem: "absolute top-2 left-2 w-12 h-0.5 bg-red-300",
        lineElem: ""
    },
    {
        bgElem: "absolute top-2 left-2 w-12 h-0.5 bg-red-300",
        lineElem: ""
    },
      {
        bgElem: "absolute top-2 left-2 w-12 h-0.5 bg-red-300",
        lineElem: ""
    },
      {
        bgElem: "absolute top-2 left-2 w-12 h-0.5 bg-red-300",
        lineElem: ""
    },
  ];

  const textColors = [
    "text-gray-800",
    "text-gray-800",
    "text-gray-800",
    "text-gray-800"
  ];

  return (
    <section className="ml-12 mr-12">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Призы для <span className="text-red-600">лучших</span> участников
          </h2>
          <p className="mt-4 text-gray-500 sm:text-xl">
            Свой карьерный портал для дипломантов!
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, idx) => (
            <div 
              key={idx} 
              className="relative block rounded-xl border border-gray-200 p-8 shadow-xl transition hover:border-blue-500/10 hover:shadow-blue-800/10 cursor-pointer bg-white"
              onClick={() => setModalContent(card.content)} 
            >
              <div className={cardStyles[idx].bgElem}></div>
              <div className={cardStyles[idx].lineElem}></div>

              <h2 className={` text-xl font-bold ${textColors[idx]} flex justify-between items-center z-10 relative`}>
                {card.title}
                <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </h2>
            </div>
          ))}
        </div>

        {modalContent && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-xl mx-4 md:mx-0">
              <p className="text-gray-600">{modalContent}</p>
              <button onClick={() => setModalContent(null)} className="mt-4 bg-red-500 text-white rounded px-4 py-2">Закрыть</button>
            </div>
          </div>
        )}
      </div>
    </section>

  );
}

export default HelloSection;
