"use client";
import React, { useEffect, useState } from 'react';
import './Page.css';
import Loader from '@/components/shared/Loader/Loader';
import FooterBlack from '@/components/Root/FooterBlack';
import { useLoading } from '@/components/Providers/LoadingProvider';
import DateSlider from '@/components/shared/events/DateSlider';
import Image from 'next/image';
interface Card {
  id: number;
  title: string;
  context: string;
  content: string;
  start_date: string;
  end_date: string;
  image_url: string;
  registration_url: string;
}




export default function Home() {
  const { loading, setLoading } = useLoading();
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState("");
  const [nonSelectedCards, setNonSelectedCards] = useState<number[]>([]);

  const [cards, setCards] = useState<Card[]>([]);

  const humanReadableDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' }).format(date);
    } catch (error) {
      console.error("Ошибка при преобразовании даты:", error);
      return "Некорректная дата";
    }
  };



  const [expandedCard, setExpandedCard] = useState<Card | null>(null);

  useEffect(() => {
    // Функция для получения данных с бэкенда
    const fetchData = async () => {
      try {
        const response = await fetch('https://team.mpei.ru/general-management/api/events/list');
        const data = await response.json();
        setCards(data);
        console.log("Загруженные данные:", data);  // Для отладки
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };


    fetchData();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    const resizeHandler = () => {
      const gap = window.innerWidth < 600 ? 30 : 50;
      document.documentElement.style.setProperty('--card-gap', `${gap}px`);
    };

    window.addEventListener('resize', resizeHandler);
    resizeHandler();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', resizeHandler);
    };
  }, [setLoading]);


  //если вы выберете дату начала, например, 15 сентября, и дату окончания, например, 25 сентября, мероприятие, которое началось 10 сентября и закончилось 20 сентября, будет отображаться. Если вы передвинете начальную дату до 21 сентября, мероприятие исчезнет, потому что его конечная дата меньше вашей выбранной начальной даты.
  const filteredCards: Card[] = cards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (
      (!startDate || card.end_date >= startDate) &&
      (!endDate || card.start_date <= endDate)
    );
  });




  const handleClickCard = (card: any) => {
    // Сначала устанавливаем карточки, которые нужно скрыть
    setNonSelectedCards(cards.map(c => c.id).filter(id => id !== card.id));

    // Затем добавляем задержку
    setTimeout(() => {
      // Ваш текущий код для раскрытия карточки
      const element = document.getElementById(`card-${card.id}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        document.documentElement.style.setProperty('--card-width', `${rect.width}px`);
        document.documentElement.style.setProperty('--card-height', `${rect.height}px`);
        document.documentElement.style.setProperty('--card-top', `${rect.top}px`);
        document.documentElement.style.setProperty('--card-left', `${rect.left}px`);
      }

      setExpandedCard(card);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (document.querySelector('.expanded-container')) {
            document.querySelector('.expanded-container')?.classList.add('showing');
          }
        });
      });
      disableBodyScroll();

    }, 350); // Задержка в 400 миллисекунд будет совпадать с временем анимации в CSS
  };

  const handleCloseCard = () => {
    if (document.querySelector('.expanded-container')) {
      document.querySelector('.expanded-container')?.classList.remove('showing');
    }

    setNonSelectedCards([]);

    setTimeout(() => {
      setExpandedCard(null);
    }, 400);
    enableBodyScroll();
  };

  const disableBodyScroll = () => {
    document.body.style.overflow = 'hidden';
  }

  const enableBodyScroll = () => {
    document.body.style.overflow = '';
  }

  return (
    <>
      <div className={`loader-container ${loading ? '' : 'fade-out'}`}>
        <Loader />
      </div>

      {expandedCard && (
        <div className="expanded-container fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="expanded-content bg-white w-full max-h-screen overflow-y-auto">
            <div className="flex flex-col items-center h-[calc(100vh-8rem)] justify-center space-y-4">
              <p className="border-2 rounded-full px-4 py-2 border-purple-500 mb-8 mt-8">
                <span className="font-medium text-purple-500">до {humanReadableDate(expandedCard.end_date)}</span>
                {expandedCard.registration_url && (
                  <a href={expandedCard.registration_url} target="_blank" rel="noopener noreferrer" className="ml-2 inline-block bg-indigo-500 text-white px-4 py-2 rounded-3xl hover:bg-purple-500 hover:text-white">
                    Принять участие
                  </a>
                )}
              </p>
              <h3 className="gradient-text text-5xl md:text-6xl font-bold pb-2 text-center mb-8">{expandedCard.title}</h3>
              <p className="text-gray-600 font-bold text-2xl text-center pt-8">
                {expandedCard.context}
              </p>
            </div>
            <div className="text-gray-600 p-6 md:w-2/3 mx-auto my-2 text-2xl ffont-semibold text-justify">
              {expandedCard.content.split(/(?<=[.!?])\s/).map((sentence, index) => {
                const trimmedSentence = sentence.trim();

                // Проверяем, содержит ли предложение двоеточие и затем хотя бы две точки с запятой
                const regex = /(.*?):(.*?[;.]$)/;
                const match = trimmedSentence.match(regex);

                // Для стиля первого слова
                const [firstWord, ...restOfSentence] = trimmedSentence.split(' ');

                if (index === 0) {
                  if (match) {
                    const intro = match[1];
                    const items = match[2].split(/[;.] /).map(item => item.trim()).filter(item => item);

                    return (
                      <div key={index} className="mb-4 pl-4 border-2 border-purple-600 p-2 rounded-full">
                        <p>
                          <span className="gradient-text">{firstWord}</span> {restOfSentence.join(' ')}
                        </p>
                        <p className="gradient-text">{intro}:</p>
                        <ul className="pl-4 list-disc">
                          {items.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  return <p key={index} className="mb-4 pl-4"><span className="gradient-text text-4xl">{firstWord}</span> {restOfSentence.join(' ')}</p>;
                } else {
                  if (match) {
                    const intro = match[1];
                    const items = match[2].split(/[;.] /).map(item => item.trim()).filter(item => item);

                    return (
                      <div key={index} className="mb-16 mt-16 pl-4 border-2 border-purple-600 p-2 rounded-3xl">
                        <p className="gradient-text">{intro}:</p>
                        <ul className="pl-4 list-disc">
                          {items.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  }

                  return <p key={index} className="mb-4 pl-4">{trimmedSentence}</p>;
                }
              })}
              {expandedCard.registration_url && (
                <a href={expandedCard.registration_url} target="_blank" rel="noopener noreferrer" className="ml-2 pb-4 pt-4 mt-8 w-full text-center inline-block border-2 border-purple-500 text-purple-500 px-6 py-2 rounded-full hover:bg-purple-500 hover:text-white">
                  Принять участие
                </a>
              )}
            </div>

            <div>
              <Image
                src="/assets/x.svg"
                alt="x"
                width={25}
                height={25}
                className="absolute top-4 right-4 close-button mr-4 mt-4"
                onClick={handleCloseCard}
              />
            </div>
          </div>
        </div>
      )}






      <div className="">
        <div className="centered-container">
          <div>
            <h1 className="centered-text gradient-text">Твоё резюме начинается здесь</h1>
            {/* <p className="small-text centered-text">Мы постоянно мониторим самые интересные мероприятия и собираем их в одном месте.</p> */}
            <input
              className='rounded-2xl'
              type="text"
              placeholder="Поиск..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <DateSlider setStartDate={setStartDate} setEndDate={setEndDate} />
          </div>
        </div>

        <div className="cards-container">
          {filteredCards.map((card) => (
            <div
              id={`card-${card.id}`}
              key={card.id}
              className={`card flex flex-col relative overflow-hidden rounded-2xl shadow-lg transition-transform transform hover:scale-105 border border-gray-100 ${nonSelectedCards.includes(card.id) ? 'hide-card' : ''}`}
              onClick={() => handleClickCard(card)}
            >
              <Image src={card.image_url} alt={card.title} width={300} height={300} />
              <div className='mt-2 rounded-2xl border border-gray-200 bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center'>
                <p className='text-md text-white'>до {humanReadableDate(card.end_date)}</p>
              </div>
              <h3 className="break-words mt-2">{card.title}</h3>
              <p className="break-words text-md text-black fade-out-effect mt-2">{card.context}</p>
              <div className="w-full flex justify-start mt-2">
                <button className="text-gray-400 text-md py-2 mt-2 hover:text-gray-600">Подробнее ➜</button>
              </div>
            </div>

          ))}
        </div>


        <footer className="w-full min-h-screen">
          <FooterBlack />
        </footer>
      </div>
    </>
  );
}
