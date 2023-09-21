function FooterBlack() {
    return (
  <div className="max-w-3xl text-center px-4 pt-16 pb-8 mx-auto sm:px-6 lg:px-8 lg:pt-24">
    <div className="text-center">
      <h2 className="text-3xl font-extrabold text-[#525375] sm:text-5xl">
        Участвуй вместе с нами!
      </h2>

      <p className="mt-4 text-[#525375] sm:text-xl">
        Мы собрали для тебя только самые престижные кейс-чемпионаты, хакатоны, олимпиады и другие мероприятия в одном месте
      </p>

      <a
        href="https://team.mpei.ru/join"
        className="inline-block px-20 py-8 mt-8 text-xl font-bold text-[#525375] border border-[#525375] hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
      >
        Присоединиться
      </a>
    </div>

    <div
      className="pt-8 mt-16 border-t border-gray-100 sm:flex sm:items-center sm:justify-center lg:mt-24" // Добавлен класс sm:justify-center
    >
      <nav aria-label="Footer Navigation - Support">
        <ul className="flex flex-wrap justify-center gap-4 text-xs">
          <li>
            <a href="https://mpei.ru" className="text-[#525375] transition hover:opacity-75">
              Официальный портал НИУ «МЭИ»
            </a>
          </li>

          <li>
            <a href="#" className="text-[#525375] transition hover:opacity-75">
              Telegram
            </a>
          </li>

          <li>
            <a href="#" className="text-[#525375] transition hover:opacity-75">
              Youtube
            </a>
          </li>

          <li>
            <a href="#" className="text-[#525375] transition hover:opacity-75">
              Текущий состав команды
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
    )
}

export default FooterBlack;
