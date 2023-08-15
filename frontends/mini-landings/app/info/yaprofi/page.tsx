import Image from "next/image";
import InfoSection from '@/components/shared/InfoSection'
import VideoSection from '@/components/shared/VideoSection'
import HelloSection from '@/components/shared/HelloSection'
import Bottombar from '@/components/shared/Bottombar'
import FAQAccordion from '@/components/shared/Faq'
import TestimotalsSection from '@/components/shared/TestimotalsSection'


function Home() {
    return (
        <div>
            {/* <div className="flex items-center justify-center ">
                <div className="flex space-x-4">
                    <p className="text-xl font-semibold text-center">Регистраций</p>
                    <a className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 flow-gradient-text">669 794</a>
                </div>
            </div> */}
            <section className="text-gray-600 body-font md:ml-16">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        {/* Flex container для изображений */}
                        <div className="flex justify-center space-x-4">
                            <Image src="/assets/orig.svg" alt="Yandex" width={50} height={50} />
                            <p className="font-extrabold text-xl text-gray-500 mt-3">Яндекс</p>
                            <Image src="/assets/orig-2.svg" alt="Yandex" width={50} height={50} />
                        </div>
                        <h1 className="title-font sm:text-3xl text-2xl mb-4 font-medium text-gray-900">Всероссийская олимпиада</h1>
                        <h2 className="font-extrabold text-transparent sm:text-5xl md:text-5xl text-3xl bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">Я - ПРОФЕССИОНАЛ</h2>
                        <p className="mt-4 text-yellow">для студентов разных направлений подготовки</p>
                        <div className="flex justify-center">
                            <button className="inline-flex mt-4 text-white bg-rose-500 border-0 py-2 px-6 focus:outline-none hover:bg-rose-600 rounded text-lg text-center">Хочу!</button>
                            <button className="ml-4 inline-flex mt-4 text-gray-700 bg-white border-0 py-2 px-6 focus:outline-none hover:bg-amber-200 rounded text-lg text-center">Официальный сайт</button>
                        </div>
                    </div>
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                        <Image className="object-cover object-center rounded" src="/assets/hero.svg" alt="hero" width={420} height={300} />
                    </div>
                </div>
            </section>



            <HelloSection />

            <section className="ml-12 mr-12">
                <InfoSection />
            </section>

            <section className="ml-12 mr-12">
                <TestimotalsSection />
            </section>


            <div className="text-center">
    <a className="lg:text-7xl text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 flow-gradient-text">669 794</a>          
    <p className="lg:text-4xl text-2xl font-semibold mb-2">Регистраций</p>
</div>

            <section className="ml-12 mr-12">
                <VideoSection />
            </section>

            <FAQAccordion />



            <Bottombar />
        </div>
    )
}

export default Home;