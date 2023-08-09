import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Meta from "./meta";


export default function Layout({
  meta,
  children,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}) {

    const session = true;
  return (
    <>
      <Meta {...meta} />
      {/* <SignInModal /> */}
      <div className="fixed w-full" />
      <div
        className={`fixed top-0 w-full border-b bg-white/0`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
        <div className="flex flex-row">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/favicon.svg"
              alt="Team logo"
              width="50"
              height="50"
              className="mr-2"
            ></Image>
            <div className="flex flex-col">
              <p className="text-xs font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-400">ИНТЕЛЛЕКТУАЛЬНАЯ</p>
              <p className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-red-500">СБОРНАЯ МЭИ</p>
            </div>
          </Link>
          <Link href="/events" className="hidden md:block mt-2 ml-10">Мероприятия</Link>
          <Link href="/docs" className="hidden md:block mt-2 ml-10">О сборной</Link>
          </div>
          <div>
          </div>
        </div>
      </div>
      <main className="flex w-full flex-col items-center justify-center py-32">
        {children}
      </main>
    </>
  );
}
