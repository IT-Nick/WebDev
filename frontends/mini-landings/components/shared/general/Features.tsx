import React from "react";
const Features = () => {
  return (
<section className="">
  <div
    className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8"
  >
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Интеллектуальная сборная <span className="text-pink-600">МЭИ</span> это
      </h2>

      <p className="mt-4 text-gray-500 sm:text-xl">
        студенческое сообщество для тех, у кого есть <span className="text-pink-600 font-bold">мотивация</span> к саморазвитию и <span className="font-bold text-pink-600">амбиции</span> к самореализации
      </p>
    </div>

    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <a
        className="block rounded-xl border border-gray-200 p-8 shadow-xl transition hover:border-blue-500/10 hover:shadow-blue-800/10"
        href="/docs#комьюнити"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>

        <h2 className="mt-4 text-xl font-bold text-black">Комьюнити</h2>

        <p className="mt-1 text-sm text-gray-600 text-justify">
          Сообщество единомышленников, которое поможет найти поддержку и вдохновение. 
          А главное ускорит процесс достижения целей, так как <span className="text-pink-600 font-bold">совместные усилия</span>, 
          опыт и знания обеспечивают более эффективное решение проблем и достижение результатов.
        </p>
      </a>

      <a
        className="block rounded-xl border border-gray-200 p-8 shadow-xl transition hover:border-blue-500/10 hover:shadow-blue-800/10"
        href="/docs#менторство-участников"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>

        <h2 className="mt-4 text-xl font-bold text-black">Менторство участников</h2>

        <p className="mt-1 text-sm text-gray-600 text-justify">
          Мы осуществляем полноценную поддержку проектных команд.
           Курируем все стадии работы над проектом. 
           Организуем встречи с ведущими отраслевыми экспертами по проблематике проекта.   
           <span className="text-pink-600 font-bold"> Мы поможем</span> даже тем, кто никогда не работал над проектами.
        </p>
      </a>

      <a
        className="block rounded-xl border border-gray-200 p-8 shadow-xl transition hover:border-blue-500/10 hover:shadow-blue-800/10"
        href="/docs#коворкинг"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>

        <h2 className="mt-4 text-xl font-bold text-black">Коворкинг</h2>

        <p className="mt-1 text-sm text-gray-600">
        Креативное <span className="text-pink-600 font-bold">пространство</span>, где участники могут совместно работать,
         обмениваться знаниями и идеями, и создавать проекты, которые изменят мир.  
        </p>
      </a>

      <a
        className="block rounded-xl border border-gray-200 p-8 shadow-xl transition hover:border-blue-500/10 hover:shadow-blue-800/10"
        href="/docs#без-операционной-работы"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>

        <h2 className="mt-4 text-xl font-bold text-black">Без операционной работы</h2>

        <p className="mt-1 text-sm text-gray-600 text-justify">
          Члены интеллектуальной сборной МЭИ могут полностью сконцентрироваться на решении ключевых задач, <span className="text-pink-600 font-bold">не отвлекаясь</span> на рутинные операции, такие как бумажная работа.
          Команда отдела проектной деятельности и творческих соревнований берет на эти задачи на себя.
        </p>
      </a>

      <a
        className="block rounded-xl border border-gray-200 p-8 shadow-xl transition hover:border-blue-500/10 hover:shadow-blue-800/10"
        href="/docs#пополнение-резюме"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>

        <h2 className="mt-4 text-xl font-bold text-black">Пополнение резюме</h2>

        <p className="mt-1 text-sm text-gray-600 text-justify">
        Участие в мероприятиях интеллектуальной сборной станет важным и полезным опытом для участников, 
        который поможет им развить свои навыки, пополнить резюме в разделах «Опыт работы» и «Достижения», эффектно <span className="text-pink-600 font-bold">выделиться на рынке труда.</span>
        </p>
      </a>

      <a
        className="block rounded-xl border border-gray-200 p-8 shadow-xl transition hover:border-blue-500/10 hover:shadow-blue-800/10"
        href="/docs#продвижение-по-карьере"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>

        <h2 className="mt-4 text-xl font-bold text-black">Продвижение по карьере</h2>

        <p className="mt-1 text-sm text-gray-600 text-justify">
         Возможность познакомиться с лучшими специалистами в своей области, сформировать<span className="text-pink-600 font-bold"> ценные контакты и связи</span>,
          а также получить приглашения на интервью и собеседования от работодателей,
         которые ищут специалистов с опытом в интеллектуальных проектах.
        </p>
      </a>
    </div>

  </div>
</section>

);
}

export default Features;