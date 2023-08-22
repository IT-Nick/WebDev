import React from 'react';

const HeroHome = () => {
  return (
    <div className="md:w-1/2 p-4 md:text-left text-center md:ml-10 md:mt-36">
    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4" data-aos="zoom-y-out">
      <div>
        Создавай <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500'>своё</span> будущее 
        </div>
        <div>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-400">вместе с нами!</span>
        </div>
    </h1>
    <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">
    Присоединяйся к студенческому сообществу НИУ «МЭИ» по проектной деятельности и становись лучшим в интеллектуальных соревнованиях
        </p>
    <div className="mt-16" data-aos="zoom-y-out" data-aos-delay="300">
      <a href="/docs/registration" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-auto mr-4 bg-gradient-to-r from-red-500 to-blue-400 hover:bg-gradient-to-r hover:from-red-600 hover:to-blue-700">Присоединиться</a>
      <a href="/docs" className="bg-gray-900 hover:bg-black text-white font-bold py-2 px-4 rounded w-auto">Узнать больше</a>
    </div>
  </div>  );
}

export default HeroHome;