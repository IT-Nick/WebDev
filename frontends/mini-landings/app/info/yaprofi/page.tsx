"use client";
import Image from "next/image";

function InfoSection() {
    return (
        <section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-3xl text-2xl mb-4 font-medium text-gray-900">Всероссийская олимпиада</h1>
        <h2 className="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">Я - ПРОФЕССИОНАЛ</h2>
      <p className="mt-4 text-yelow">Всероссийская олимпиада для студентов разных направлений подготовки: технических, гуманитарных, естественно-научных, педагогических, аграрных и медицинских</p>
      <div className="flex justify-center">
        <button className="inline-flex mt-4 text-white bg-rose-500 border-0 py-2 px-6 focus:outline-none hover:bg-rose-600 rounded text-lg">Хочу!</button>
        <button className="ml-4 inline-flex mt-4 text-gray-700 bg-white border-0 py-2 px-6 focus:outline-none hover:bg-amber-200 rounded text-lg">Официальный сайт</button>
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
    <Image className="object-cover object-center rounded" src="/assets/hero.svg" alt="hero" width={720} height={600} />
    </div>
  </div>
</section>
    )
}

export default InfoSection;