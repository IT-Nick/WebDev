"use client";
import React, { useEffect, useRef } from "react";
import "./Atom.css";

const Atom: React.FC = () => {
  const atomContainerRef = useRef<HTMLDivElement | null>(null);
  const atomCanvasRef = useRef<SVGSVGElement | null>(null);
  const animationCenterRef1 = useRef<HTMLDivElement | null>(null);
  const animationCenterRef2 = useRef<HTMLDivElement | null>(null);
  const animationCenterRef3 = useRef<HTMLDivElement | null>(null);
  const nucleusRef = useRef<HTMLDivElement | null>(null);

  const animateDot = (element: HTMLDivElement | null, centerX: number, centerY: number, a: number, b: number, rotation: number = 0) => {
    let angle = 0;
    function animate() {
      if (element) {
        const dotSize = parseFloat(getComputedStyle(element).width);
        const dotRadius = dotSize / 2;
        const x = centerX + a * Math.cos(angle) * Math.cos(rotation) - b * Math.sin(angle) * Math.sin(rotation);
        const y = centerY + a * Math.cos(angle) * Math.sin(rotation) + b * Math.sin(angle) * Math.cos(rotation);
        element.style.left = `${x - dotRadius}px`;
        element.style.top = `${y - dotRadius}px`;
      }
      angle += 0.01;
      requestAnimationFrame(animate);
    }
    animate();
  };

  const initAnimation = () => {
    const container = atomContainerRef.current;
    const svgElement = atomCanvasRef.current;
    if (!container || !svgElement) return;

    const { width } = container.getBoundingClientRect();
    const centerX = width / 2;
    const centerY = width / 2;

    const dotSize = width * 0.10;
    const nucleusSize = width * 0.20; // Добавлено для адаптивности размера ядра

    if (nucleusRef.current) {
      nucleusRef.current.style.width = `${nucleusSize}px`; // Устанавливаем новый размер для ядра
      nucleusRef.current.style.height = `${nucleusSize}px`; // Устанавливаем новый размер для ядра
      nucleusRef.current.style.left = `${centerX - nucleusSize / 2}px`; // Коррекция позиции
      nucleusRef.current.style.top = `${centerY - nucleusSize / 2}px`; // Коррекция позиции
      nucleusRef.current.style.fontSize = `${nucleusSize * 0.5}px`; // Адаптивный размер шрифта для ядра
    }

    [animationCenterRef1.current, animationCenterRef2.current, animationCenterRef3.current].forEach((ref) => {
      if (ref) {
        ref.style.width = `${dotSize}px`;
        ref.style.height = `${dotSize}px`;
      }
    });

    animateDot(animationCenterRef1.current, centerX, centerY, 0.14 * width, 0.3 * width);
    animateDot(animationCenterRef2.current, centerX, centerY, 0.14 * width, 0.35 * width, 2 * Math.PI / 5);
    animateDot(animationCenterRef3.current, centerX, centerY, 0.14 * width, 0.35 * width, -2 * Math.PI / 5);

    const addOrbit = (rx: number, ry: number, rotation: number) => {
      const ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
      ellipse.setAttribute("cx", "50");
      ellipse.setAttribute("cy", "50");
      ellipse.setAttribute("rx", `${rx}`);
      ellipse.setAttribute("ry", `${ry}`);
      ellipse.setAttribute("transform", `rotate(${rotation} 50 50)`);
      ellipse.setAttribute("stroke", "#ccc");
      ellipse.setAttribute("stroke-width", "0.2");
      ellipse.setAttribute("fill", "none");
      svgElement.appendChild(ellipse);
    };

    addOrbit(14, 30, 0);
    addOrbit(14, 35, 72);
    addOrbit(14, 35, -72);
  };

  useEffect(() => {
    initAnimation();
    window.addEventListener("resize", initAnimation);
    return () => {
      window.removeEventListener("resize", initAnimation);
    };
  }, []);

  return (
    <div ref={atomContainerRef} className="atomContainer">
      <svg ref={atomCanvasRef} className="atomCanvas" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      </svg>
      <div ref={nucleusRef} className="nucleus">И</div>
      <div ref={animationCenterRef1} className="animationCenter"></div>
      <div ref={animationCenterRef2} className="animationCenter"></div>
      <div ref={animationCenterRef3} className="animationCenter"></div>
    </div>
  );
};

export default Atom;
