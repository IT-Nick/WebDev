import React from "react";

const Stats = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Участие в крупнейших соревнованиях
          </h2>

          <p className="mt-4 text-gray-500 sm:text-xl">
            У нас за спиной многолетний опыт участия студентов НИУ «МЭИ» в самых престижных всероссийских и международных интеллектуальных соревнованиях
          </p>
        </div>

        <div className="mt-8 sm:mt-12">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div
              className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center"
            >
              <dt className="order-last text-lg font-medium text-gray-500">
                Участий в мероприятиях
              </dt>

              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                100+
              </dd>
            </div>

            <div
              className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center"
            >
              <dt className="order-last text-lg font-medium text-gray-500">
                Побед и призовых мест
              </dt>

              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                60+
              </dd>
            </div>

            <div
              className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center"
            >
              <dt className="order-last text-lg font-medium text-gray-500">
                Офферов*
                <p className="text-xs">*стажировки/трудоустройство</p>
              </dt>
              
              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">40+</dd>

            </div>
          </dl>
        </div>
      </div>
    </section>
      
);
}

export default Stats;