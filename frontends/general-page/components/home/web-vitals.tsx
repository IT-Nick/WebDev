import { ReactNode } from "react";

interface Num {
  p1: ReactNode,
  p2: ReactNode,
  p3: ReactNode,
}

export default function WebVitals({ p1, p2, p3 }: Num) {
  return (
    <div className="h-full w-full flex flex-col p-10 md:text-xs justify-left text-left">
      <div className="text-xl font-bold">Этап: <span className="text-xl text-yellow-500">{p1}</span></div>
      <div className="text-xl font-bold">Статус: <span className="text-xl text-green-500">{p2}</span></div>
      <div className="text-xl font-bold">Участники: <span className="text-xl text-green-500">{p3}</span></div>
    </div>
  );
}
