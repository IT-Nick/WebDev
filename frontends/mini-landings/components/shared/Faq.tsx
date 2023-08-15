"use client";
import React, { useState } from 'react';
import Image from 'next/image';


const FAQAccordion: React.FC = () => {

  const ArrowIcon: React.FC = () => (
    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 1.16683L7.33333 7.00016L1.5 12.8335" stroke="#171A1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  );

  const FAQItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="w-full p-1.5">
        <button className="block w-full p-6 border border-gray-200 hover:border-gray-300 rounded-lg transition duration-200" onClick={() => setIsOpen(!isOpen)}>
          <div className="flex justify-between items-center">
          <h3 className="font-semibold tracking-tight flex-grow text-black">{question}</h3>
            <div>
              <ArrowIcon />
            </div>
          </div>
          <p className={isOpen ? "mt-6 tracking-tight text-black" : "hidden mt-6 tracking-tight text-black"}>
    {answer}
</p>
        </button>
      </div>
    );
  };

  return (
    <section className="ml-12 mr-12 py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap -m-8">
          <div className="w-full md:w-1/2 p-8">
            <a 
              href="https://yandex.ru/profi/faq" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block max-w-max mb-6 px-3 py-1.5 text-sm text-white uppercase tracking-tight font-semibold rounded-full hover:shadow-lg transition duration-200 transform hover:scale-105 animate-pulse"
              style={{ 
                backgroundImage: "linear-gradient(to right, red, yellow)", 
                backgroundRepeat: 'no-repeat', 
                backgroundSize: 'cover' 
              }}
            >
              Подробнее тут
            </a>
            <h2 className="font-heading text-6xl tracking-tighter text-black">Часто задаваемые вопросы</h2>
          </div>
          <div className="w-full md:w-1/2 p-8">
            <div className="flex flex-wrap -m-1.5 text-black">
              <FAQItem 
                question="Как зарегистрироваться для участия в олимпиаде?" 
                answer="Регистрация на шестой сезон олимпиады была завершена 15 ноября в 23:59 по московскому времени. Регистрация на следующий сезон стартует осенью 2023 года. Оставьте свою почту, чтобы мы напомнили вам о старте регистрации."
              />
              <FAQItem 
                question="Как узнать баллы, по которым определяются финальные статусы дипломантов олимпиады?" 
                answer="Вы можете ознакомиться с этой информацией на данной странице."
              />
              <FAQItem 
                question="Как проверить электронный диплом? Как я могу получить бумажную версию диплома с печатью?" 
                answer="Сертификаты и дипломы - только электронные, их можно проверить на данной странице. Они будут доступны для скачивания в личном кабинете участника на вкладке «Мои направления». На почту эти документы не отправляются."
              />
              <FAQItem 
                question="Какие вузы учитывают результаты олимпиады?" 
                answer="Посетите соответствующий раздел сайта, перейдя по этой ссылке."
              />
              <FAQItem 
                question="Я забыл(а) пароль от личного кабинета" 
                answer="Если вы регистрировались с помощью аккаунта на Яндекс.Паспорте, то восстановите его по этой ссылке. Если при регистрации вы использовали аккаунт в какой-нибудь социальной сети или Mail, Google (GMail), то вы должны использовать эти данные для входа. В таком случае пароль восстанавливается в этих сервисах."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
