"use client";
import './Page.css';
import React, { useEffect, useState } from 'react';
import Loader from '@/components/shared/Loader/Loader';
import { useLoading } from '@/components/Providers/LoadingProvider';
import StarFall from '@/components/shared/new/StarFall';

export default function Home() {
  const { loading, setLoading } = useLoading();
  const questions = ['Почта', 'Пароль'];
  const [answers, setAnswers] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Предотвращаем автоматическую отправку формы

    if (!/\S+@\S+\.\S+/.test(answers[0] || '')) {
      setErrorMessage('Неверный формат почты');
      return;
    }

    if (!answers[1]) {
      setErrorMessage('Пароль не может быть пустым');
      return;
    }

    try {
      const response = await fetch('/general-management/api/submitAnswers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: answers[0], password: answers[1] }),
      });

      const data = await response.json();

      if (data.success) {
        // Здесь ваш код для успешной отправки, например переход на другую страницу
      } else {
        setErrorMessage('Что-то пошло не так');
      }
    } catch (error) {
      console.error('Fetch failed', error);
      setErrorMessage('Произошла ошибка при отправке данных');
    }
  };


  return (
    <div>
      <div className={`loader-container ${loading ? '' : 'fade-out'}`}>
        <Loader />
      </div>
      <StarFall />
      <div className={`flex flex-col items-center justify-center min-h-screen ${!loading ? 'fade-in' : 'fade-out'} ml-8 mr-8`}>
        <div className="w-full max-w-2xl h-3/4 relative">
          <form onSubmit={handleSubmit}>
            {questions.map((question, index) => (
              <div key={index} className="mb-4">
                <div className="text-4xl font-bold text-[#525375] mb-4">{question}</div>
                <div className="relative">
                  <input
                    className="border w-full h-16 py-8 px-4 text-2xl"
                    style={{ borderWidth: '2px', borderColor: '#525375', color: '#525375' }}
                    type={index === 1 && !showPassword ? 'password' : 'text'}
                    value={answers[index] || ''}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                  {index === 1 && (
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer text-gray-400"
                    >
                      {showPassword ? 'Скрыть' : 'Показать'}
                    </span>
                  )}
                </div>
              </div>
            ))}
            <button
              onClick={handleSubmit}
              className="bg-[#525375] text-white font-bold py-2 px-4 rounded w-full h-16 text-2xl hover:bg-white hover:text-[#525375] hover:border-[#525375] border-2 transition duration-300 ease-in-out"
            >
              Отправить
            </button>
          </form>
          {errorMessage && (
            <div className="text-red-500 mt-2">{errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
}
