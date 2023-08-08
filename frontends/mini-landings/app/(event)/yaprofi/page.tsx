"use client";
import Image from "next/image";

function InfoSection() {
    return (
        <div className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">ОЛИМПИАДА «Я — ПРОФЕССИОНАЛ»
                </h1>
                <p className="mb-8 leading-relaxed">Всероссийская олимпиада для студентов разных направлений подготовки: технических, гуманитарных, естественно-научных, педагогических, аграрных и медицинских</p>
                <div className="flex justify-center">
                    <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">Хочу!</button>
                </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                <Image className="object-cover object-center rounded" src="/assets/hero.svg" alt="hero" width={720} height={600} />
                </div>
            </div>
        </div>
    )
}

export default InfoSection;