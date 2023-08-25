import Image from "next/legacy/image";

function Partners() {
    return (
        <footer aria-label="Site Footer" className="bg-white">
            <div className="max-w-3xl text-center px-4 pt-16 pb-8 mx-auto sm:px-6 lg:px-8 lg:pt-24">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-5xl">
                        Партнеры олимпиады
                    </h2>

                    <p className="mt-4 text-gray-500 sm:text-xl">
                    </p>

                    {/* Flex container для изображений */}
                    <div className="flex justify-center mt-6 space-x-4">
                        <Image src="/assets/orig.svg" alt="Yandex" width={100} height={100} />
                        <Image src="/assets/orig-1.svg" alt="Yandex" width={100} height={100} />
                        <Image src="/assets/orig-2.svg" alt="Yandex" width={100} height={100} />
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Partners;