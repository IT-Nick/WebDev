import Link from "next/link";
import { ReactNode } from "react";
import Balancer from "react-wrap-balancer";

export default function Card({
  title,
  description,
  photo,
  demo,
  large,
  link,
}: {
  title: string;
  description: ReactNode; 
  photo: ReactNode;
  demo: ReactNode;
  large?: boolean;
  link: string;
}) {
  return (
      <div
      className={`relative col-span-1 h-auto overflow-hidden rounded-xl border border-gray-200 bg-white bg-opacity-90 hoverable shadow-md hover:shadow-2xl hover:bg-opacity-100 ${
        large ? "md:col-span-3" : ""
      }`}
    >          
    <Link href={link} target="_blank" >
      <div className="flex h-60 items-center justify-center md:mt-4">{photo}</div>
      <div className="mx-auto max-w-md text-center">
        <h2 className="ml-1 mr-1 bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent md:text-3xl md:font-normal">
          <Balancer>{title}</Balancer>
        </h2>
        <div className={`flex flex-grow text-center`}>
          {demo}</div>

        <div className="flex-grow text-justify text-gray-500 mt-4 mb-4 ml-4 mr-4">
          {description}
        </div>
      </div>
      </Link>

    </div>
  );
}
