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
  start_date: string;
  end_date: string;
  image_url: string;
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
        const response = await fetch('/general-management/api/events/list');
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

  const filteredCards: Card[] = cards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(search.toLowerCase());
    if (startDate || endDate) {
      return matchesSearch && (
        (startDate ? card.start_date >= startDate : true) &&
        (endDate ? card.end_date <= endDate : true)
      );
    }
    return matchesSearch;
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
  };

  return (
    <>
      <div className={`loader-container ${loading ? '' : 'fade-out'}`}>
        <Loader />
      </div>

      {expandedCard && (
        <div className="expanded-container">
          <button className="close-button" onClick={handleCloseCard}>X</button>
          <h3>{expandedCard.title}</h3>
          <p>{expandedCard.context}</p>
          <p>Прием заявок с: {humanReadableDate(expandedCard.start_date)}</p>
          <p>Прием заявок до: {humanReadableDate(expandedCard.end_date)}</p>

        </div>
      )}

      <div className=" w-full">
        <div className="centered-container">
          <div>
            <h1 className="centered-text">Твоё резюме начинается здесь</h1>
            <p className="small-text centered-text">Мы постоянно мониторим самые интересные мероприятия и собираем их в одном месте.</p>
            <input
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
              className={`card ${nonSelectedCards.includes(card.id) ? 'hide-card' : ''}`}
              onClick={() => handleClickCard(card)}
            >
              <Image src={card.image_url} alt={card.title} width={300} height={300} />
              <h3>{card.title}</h3>
              <p className="content-text">{card.context}</p> {/* Обновлено: изменил content на context */}
              <p>Прием заявок с: {humanReadableDate(card.start_date)}</p>
              <p>Прием заявок до: {humanReadableDate(card.end_date)}</p>
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
