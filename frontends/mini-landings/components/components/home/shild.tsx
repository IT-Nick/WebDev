import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";

export default function Shild({
  text,
  color,
  number,
}: {
  text: string;
  color: string; 
  number: number;
}) {
  return (
    <div
      className={`relative col-span-1 h-5 overflow-hidden rounded-xl border bg-white ${
        color ? color : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-md text-center">
        <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent md:text-3xl md:font-normal">
          <Balancer>{text}</Balancer> <a>{number}</a>
        </h2>
      </div>
    </div>
  );
}
