"use client";
// Импорт стилей
import './Page.css';
import { useEffect, useState } from 'react';
import Loader from '@/components/shared/Loader/Loader';
import { useLoading } from '@/components/Providers/LoadingProvider';
import StarFall from '@/components/shared/new/StarFall';


export default function Home() {
  const { loading, setLoading } = useLoading();
  const questions = ['Какая у тебя почта?', 'В каком ты институте?', 'На каком ты курсе?', 'Есть опыт командной работы?', 'Что ты умеешь лучше всего?', 'Напиши свое ФИО'];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showArrow, setShowArrow] = useState(true);
  const [answers, setAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [shouldShowForm, setShouldShowForm] = useState(true);
  const [shouldShowThankYou, setShouldShowThankYou] = useState(false);
  const [showTitle, setShowTitle] = useState(true); // Новое состояние
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // новое состояние для сообщения об ошибке
  const [serverError, setServerError] = useState<string | null>(null); // Новое состояние для ошибки от сервера

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setShouldShowForm(false);
        setShouldShowThankYou(true);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [submitted]);

  const progressBarWidth = `${(currentQuestion / questions.length) * 100}%`;

  const handleNextQuestion = () => {
    const answer = answers[currentQuestion] || '';

    if (!answer) {
      setErrorMessage("нужен ответ");
      return;
    }

    if (currentQuestion === 0 && !/\S+@\S+\.\S+/.test(answer)) {
      setErrorMessage("это не почта");
      return;
    }

    setErrorMessage(null);
    setShowArrow(false);
    setShowTitle(false);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        const [email, institute, course, team_experience, best_skill, full_name] = answers;

        fetch('/general-management/api/applications/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            institute,
            course: parseInt(course, 10),
            team_experience: team_experience.toLowerCase() === 'да',
            best_skill,
            full_name
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setSubmitted(true);
            } else {
              setServerError(data.message || 'Неизвестная ошибка сервера');
            }
          })
          .catch((error) => {
            console.error('Fetch failed', error);
            setServerError('Произошла ошибка при отправке данных');
          });
      }
      setShowTitle(true);
      setShowArrow(true);
    }, 500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNextQuestion();
    }
  };

  return (
    <>
      <div className={`loader-container ${loading ? '' : 'fade-out'}`}>
        <Loader />
      </div>
      <StarFall />
      {shouldShowForm && (
        <div className={`flex flex-col items-center justify-center min-h-screen ${!loading && !submitted ? 'fade-in' : 'fade-out'} ml-8 mr-8`}>
          <div className="w-full max-w-2xl h-3/4 relative">
            <div className={`text-4xl font-bold text-[#525375] mb-4 ${showTitle ? 'fade-in' : 'fade-out'}`}>{questions[currentQuestion]}</div>
            <div className="relative h-full w-full">
              <input
                className="border w-full h-1/2 py-8 px-4 text-2xl"
                style={{ borderWidth: '2px', borderColor: '#525375', color: '#525375' }}  // добавлено свойство color
                type="text"
                value={answers[currentQuestion] || ''}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              {showArrow && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-3xl arrow"
                  style={{ color: '#525375' }}
                  onClick={handleNextQuestion}>
                  ➜
                </div>
              )}
              <div className="h-2 bg-gray-300">
                <div className="h-full bg-blue-500 progress-bar" style={{ width: progressBarWidth }}></div>
              </div>
            </div>
            <div className="absolute bottom-2 right-3 text-gray-400">
              {`${Math.min(currentQuestion + 1, questions.length)}/${questions.length}`}
            </div>
            {errorMessage && (
              <div className="absolute bottom-2 left-3 text-gray-400">{errorMessage}</div>
            )}
            {serverError && (
              <div className="absolute bottom-2 left-3 text-red-400">
                {serverError}
              </div>
            )}
          </div>
        </div>
      )}

      {shouldShowThankYou && (
        <div className={`flex flex-col items-center justify-center ml-8 mr-8 min-h-screen ${submitted ? 'fade-in' : 'fade-out'}`}>
          <div className="text-3xl font-bold text-[#525375] text-center md:text-4xl">Заявка принята! Мы все проверим и вышлем вам дорожную карту</div>
        </div>
      )}
    </>
  );
}