import React from 'react';
import './Stats.css';

const Stats = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-12 mt-8 sm:px-6 md:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
      <div className="marquee">
        <div className="marquee-content text-2xl font-bold text-[#525375] sm:text-3xl mt-4 mb-8">
          <span>У нас за спиной многолетний опыт участия студентов НИУ «МЭИ» в самых престижных всероссийских и международных интеллектуальных соревнованиях</span>
          <span>&nbsp;&nbsp;У нас за спиной многолетний опыт участия студентов НИУ «МЭИ» в самых престижных всероссийских и международных интеллектуальных соревнованиях</span>
          <span>&nbsp;&nbsp;У нас за спиной многолетний опыт участия студентов НИУ «МЭИ» в самых престижных всероссийских и международных интеллектуальных соревнованиях</span>
          <span>&nbsp;&nbsp;У нас за спиной многолетний опыт участия студентов НИУ «МЭИ» в самых престижных всероссийских и международных интеллектуальных соревнованиях</span>  
        </div>
      </div>
        <h2 className="text-5xl font-bold text-[#525375] sm:text-6xl">
          Участие в крупнейших соревнованиях
        </h2>
      </div>

        <div className="mt-4 sm:mt-12">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div
              className="flex flex-col px-4 py-8 text-center"
            >
              <dt className="order-last text-lg font-medium text-[#525375]">
                Участий в мероприятиях
              </dt>

              <dd className="text-4xl font-extrabold text-rose-500 md:text-5xl">
                100+
              </dd>
            </div>

            <div
              className="flex flex-col px-4 py-8 text-center"
            >
              <dt className="order-last text-lg font-medium text-[#525375]">
                Побед и призовых мест
              </dt>

              <dd className="text-4xl font-extrabold text-rose-500 md:text-5xl">
                60+
              </dd>
            </div>

            <div
              className="flex flex-col px-4 py-8 text-center"
            >
              <dt className="order-last text-lg font-medium text-[#525375]">
                Офферов*
                <p className="text-xs">*стажировки/трудоустройство</p>
              </dt>
              
              <dd className="text-4xl font-extrabold text-rose-500 md:text-5xl">40+</dd>

            </div>
          </dl>
        </div>
      </div>      
);
}

export default Stats;