import Card from "@/components/home/card";
import Layout from "@/components/layout";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import HeroEvent from "@/components/partials/HeroEvent";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <Layout>
        <HeroEvent />
        <div className="my-10 grid w-full max-w-screen-xl animate-[slide-down-fade_0.5s_ease-in-out] grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {features.map(({ title, description, photo, demo, large, link }) => (
          <Card
            key={title}
            title={title}
            description={description}
            photo={photo}
            demo={
              title === "На это мероприятие нет отзывов" ? (
                <ComponentGrid />
              ) : (
                demo
              )
            }
            large={large}
            link={link}
          />
        ))}
      </div>


      <section className="text-gray-500">
  <div
    className="lg:flex lg:items-center"
  >
    <div className="mx-auto max-w-3xl text-center">
      <h1
        className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
      >
        Нет открытых мероприятий?

        <span className="sm:block"> Скоро появятся новые! </span>
      </h1>

      <p className="mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed">
        Следи за обновлением страницы мероприятий и новостями в нашем телеграм канале
      </p>
    </div>
  </div>
</section>



      <Footer />
    </Layout>
  );
}

const features = [
  {
    title: "Онлайн конкурс «Лидеры цифровой трансформации»",
    link: "https://mospolytech.ru/events/lidery-tsifrovoy-transformatsii/#:~:text=%C2%AB%D0%9B%D0%B8%D0%B4%D0%B5%D1%80%D1%8B%20%D1%86%D0%B8%D1%84%D1%80%D0%BE%D0%B2%D0%BE%D0%B9%20%D1%82%D1%80%D0%B0%D0%BD%D1%81%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D0%B8%C2%BB%20%E2%80%94%20%D1%8D%D1%82%D0%BE,%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D1%8B%20%E2%80%93%2010%20000%20000%20%D1%80%D1%83%D0%B1%D0%BB%D0%B5%D0%B9.",
    description:
      "Это ежегодный конкурс на соискание премий Мэра Москвы по созданию новых цифровых продуктов и сервисов для города. В этом году конкурс международный и проходит онлайн, поэтому участвовать могут все, независимо от места жительства. Потребуется только компьютер с доступом в интернет.",
      photo: (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/eventLogos/leaders.jpg"
            alt="Надежда энергетики"
            width={200}
          />
      ),
      demo: <WebVitals p1={"Идет регистрация"} p2={"командная работа"} p3={"2+ курс"}/>,
      large: false,
  },
  {
    title: "Открытая студенческая олимпиада «НАДЕЖДА ЭНЕРГЕТИКИ»",
    link: "https://www.energy-olymp.ru/",
    description:
      "Олимпиада состоит из нескольких этапов, включая теоретические и практические задания, а также защиту проектов. Участники могут показать свои знания и навыки в области энергетики, применять и развивать свои инженерные и научные компетенции, а также получить опыт работы в команде и выступление перед аудиторией.      ",
      photo: (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/eventLogos/1.gif"
            alt="Надежда энергетики"
            width={150}
          />
      ),
      demo: <WebVitals p1={"отборочный завершен"} p2={"личное первенство"} p3={"3+ курс"}/>,
      large: false,
  },
  {
    title: "Всероссийская олимпиада студентов «Я-профессионал»",
    link: "https://yandex.ru/profi/",
    description:
      "Флагманский проект президенской платформы АНО «Россия - Страна возможностей». Олимпиада объединяет более 72 профессиональных компетенций в различных областях. Участники могут выбрать интересующую их сферу и проявить свои профессиональные навыки и таланты, подать заявку на участие в образовательных форумах, получить предложения о стажировках.",
    photo: (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/eventLogos/Yaprofi.svg"
            alt="Надежда энергетики"
            width={200}
          />
      ),
      demo: <WebVitals p1={"идет заключительный"} p2={"личное первенство"} p3={"1+ курс"}/>,
    large: false,
  },
  {
    title: "Международный инженерный чемпионат «Case-In»",
    link: "https://case-in.ru/",
    description:
    "Команды (3-4 человека) участников решают задачи решают практикоориентированные инженерные кейсы, связанные с функционированием топливно-энергетического или минерально-сырьевого комплекса, используя свои знания и навыки в области проектирования, моделирования и инженерии. ",
    photo: (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/eventLogos/logo2018.png"
            alt="Надежда энергетики"
            width={200}
          />
    ),
    demo: <WebVitals p1={"отборочный завершен"} p2={"командная работа"} p3={"до 25 лет"}/>,

  },
  {
    title: "Молодежный глобальный прогноз развития энергетики",
    link: "https://fondsmena.ru/project/prognoz-TEK-2023/",
    description:
      "Проект предусматривает выполнение командами (10-15 человек) аналитики доступных информационных источников по выбранной теме в соответствии с заданием организаторов и построение модели развития тэк и мск под влиянием выявленных трендов в кратко-, средне- и долгосрочном периоде, а также оценкой влияния прогнозируемых изменений на социально-экономическое развитие россии, включая смежные сектора экономики.",
      photo: (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/eventLogos/logosmena.png"
            alt="Надежда энергетики"
            width={300}
          />
      ),
      demo: <WebVitals p1={"идет отборочный"} p2={"командная работа"} p3={"до 25 лет"}/>,
    
  },
  {
    title: "Открытые международные студенческие Интернет-олимпиады",
    link: "https://olymp.i-exam.ru/olympsStages?type=open_olymp",
    description:
      <div>
        Классическая олимпиада по базовым техническим дисциплинам: 
        <ul className="text-left ml-4 mt-2">
          <li>• математика</li>
          <li>• физика</li>
          <li>• информатика</li>
          <li>• сопротивление материалов</li>
          <li>• теоретическая механика</li>
          <li>• начертательная геометрия и инженерная графика</li>
        </ul>
      </div>,
      photo: (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/eventLogos/icolymp.png"
            alt="Надежда энергетики"
            width={100}
          />
      ),
      demo: <WebVitals p1={"идет 2 тур"} p2={"личное первенство"} p3={"1-3 курс"}/>,
  },
  {
    title: "Проектно-образовательный интенсив «От идеи к прототипу»",
    link: "https://intensive.2035.university/#:~:text=%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BD%D0%BE%2D%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%20%D0%B8%D0%BD%D1%82%D0%B5%D0%BD%D1%81%D0%B8%D0%B2%20%C2%AB%D0%9E%D1%82%20%D0%B8%D0%B4%D0%B5%D0%B8,%D1%83%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%BF%D1%80%D0%BE%D1%86%D0%B5%D1%81%D1%81%D0%BE%D0%BC%20%D0%BD%D0%B0%20%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D0%B5%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85.",
    description:
      <div>
        Это интенсив для тех, кто хочет придумать и реализовать свой
        проект на основе новых технологий, получить новые знания и применить их на практике. 
        В ходе интенсива сочетается командная работа над технологическим проектом и обучение по индивидуальным 
        образовательным траекториям а также основы работы с цифровыми инструментами для управления процессом на основе данных.
      </div>,
      photo: (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/eventLogos/incubator.jpg"
            alt="Надежда энергетики"
            width={300}
          />
      ),
      demo: <WebVitals p1={<span className="text-red-500">сезон завершен</span>} p2={"командная работа"} p3={"1+ курс"}/>,
  },
];
