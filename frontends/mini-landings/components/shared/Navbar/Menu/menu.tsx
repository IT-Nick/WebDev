"use client";
import React, { useEffect } from 'react';

import './menu.css';
// Type definitions for easing functions
type EasingFunction = (t: number) => number;

interface EasingFunctions {
  exponentialIn: EasingFunction;
  exponentialOut: EasingFunction;
  exponentialInOut: EasingFunction;
  sineOut: EasingFunction;
  circularInOut: EasingFunction;
  cubicIn: EasingFunction;
  cubicOut: EasingFunction;
  cubicInOut: EasingFunction;
  quadraticOut: EasingFunction;
  quarticOut: EasingFunction;
}

// Easing functions
const ease: EasingFunctions = {
  exponentialIn: (t) => {
    return t === 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
  },
  exponentialOut: (t) => {
    return t === 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
  },
  exponentialInOut: (t) => {
    return t === 0.0 || t === 1.0
      ? t
      : t < 0.5
        ? +0.5 * Math.pow(2.0, (20.0 * t) - 10.0)
        : -0.5 * Math.pow(2.0, 10.0 - (t * 20.0)) + 1.0;
  },
  sineOut: (t) => {
    const HALF_PI = 1.5707963267948966;
    return Math.sin(t * HALF_PI);
  },
  circularInOut: (t) => {
    return t < 0.5
        ? 0.5 * (1.0 - Math.sqrt(1.0 - 4.0 * t * t))
        : 0.5 * (Math.sqrt((3.0 - 2.0 * t) * (2.0 * t - 1.0)) + 1.0);
  },
  cubicIn: (t) => {
    return t * t * t;
  },
  cubicOut: (t) => {
    const f = t - 1.0;
    return f * f * f + 1.0;
  },
  cubicInOut: (t) => {
    return t < 0.5
      ? 4.0 * t * t * t
      : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
  },
  quadraticOut: (t) => {
    return -t * (t - 2.0);
  },
  quarticOut: (t) => {
    return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
  },
};

class ShapeOverlays {
  elm: HTMLElement;
  path: NodeListOf<SVGPathElement>;
  numPoints: number;
  duration: number;
  delayPointsArray: number[];
  delayPointsMax: number;
  delayPerPath: number;
  timeStart: number;
  isOpened: boolean;
  isAnimating: boolean;

  constructor(elm: HTMLElement) {
    this.elm = elm;
    this.path = elm.querySelectorAll('path');
    this.numPoints = 4;
    this.duration = 800;
    this.delayPointsArray = [];
    this.delayPointsMax = 180;
    this.delayPerPath = 70;
    this.timeStart = Date.now();
    this.isOpened = false;
    this.isAnimating = false;
  }

  toggle() {
    this.isAnimating = true;
    const range = Math.random() * Math.PI * 2;
    for (let i = 0; i < this.numPoints; i++) {
      const radian = (i / (this.numPoints - 1)) * Math.PI * 2;
      this.delayPointsArray[i] = (Math.sin(radian + range) + 1) / 2 * this.delayPointsMax;
    }
    if (this.isOpened === false) {
      this.open();
    } else {
      this.close();
    }
  }

  open() {
    this.isOpened = true;
    this.elm.classList.add('is-opened');
    this.timeStart = Date.now();
    this.renderLoop();
  }

  close() {
    this.isOpened = false;
    this.elm.classList.remove('is-opened');
    this.timeStart = Date.now();
    this.renderLoop();
  }

  updatePath(time: number) {
    const points: number[] = [];
    for (let i = 0; i < this.numPoints; i++) {
      points[i] = ease.cubicInOut(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1)) * 100;
    }

    let str = '';
    str += (this.isOpened) ? `M 0 0 V ${points[0]} ` : `M 0 ${points[0]} `;
    for (let i = 0; i < this.numPoints - 1; i++) {
      const p = (i + 1) / (this.numPoints - 1) * 100;
      const cp = p - (1 / (this.numPoints - 1) * 100) / 2;
      str += `C ${cp} ${points[i]} ${cp} ${points[i + 1]} ${p} ${points[i + 1]} `;
    }
    str += (this.isOpened) ? `V 0 H 0` : `V 100 H 0`;
    return str;
  }

  render() {
    if (this.isOpened) {
      for (let i = 0; i < this.path.length; i++) {
        this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * i)));
      }
    } else {
      for (let i = 0; i < this.path.length; i++) {
        this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - i - 1))));
      }
    }
  }

  renderLoop() {
    this.render();
    if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax) {
      requestAnimationFrame(() => {
        this.renderLoop();
      });
    } else {
      this.isAnimating = false;
    }
  }
}

const Menu: React.FC = () => {
  useEffect(() => {
    const elmHamburger = document.querySelector('.hamburger') as HTMLElement;
    const gNavItems = document.querySelectorAll('.global-menu__item') as NodeListOf<HTMLElement>;
    const elmOverlay = document.querySelector('.shape-overlays') as HTMLElement;
    const overlay = new ShapeOverlays(elmOverlay);

    elmHamburger.addEventListener('click', () => {
      if (overlay.isAnimating) {
        return;
      }
      overlay.toggle();
      if (overlay.isOpened) {
        elmHamburger.classList.add('is-opened-navi');
        gNavItems.forEach((item) => {
          item.classList.add('is-opened');
        });
      } else {
        elmHamburger.classList.remove('is-opened-navi');
        gNavItems.forEach((item) => {
          item.classList.remove('is-opened');
        });
      }
    });
  }, []);

  return (
    // Ваш JSX код
	<div className="demo-2">
		<main className="main main--demo-2">
			<div className="content content--demo-2">
				<div className="hamburger js-hover">
					<div className="hamburger__line hamburger__line--01">
						<div className="hamburger__line-in hamburger__line-in--01"></div>
					</div>
					<div className="hamburger__line hamburger__line--02">
						<div className="hamburger__line-in hamburger__line-in--02"></div>
					</div>
					<div className="hamburger__line hamburger__line--03">
						<div className="hamburger__line-in hamburger__line-in--03"></div>
					</div>
					<div className="hamburger__line hamburger__line--cross01">
						<div className="hamburger__line-in hamburger__line-in--cross01"></div>
					</div>
					<div className="hamburger__line hamburger__line--cross02">
						<div className="hamburger__line-in hamburger__line-in--cross02"></div>
					</div>
				</div>
				<div className="global-menu">
					<div className="global-menu__wrap">
						<a className="global-menu__item global-menu__item--demo-2" href="#">Мероприятия</a>
						<a className="global-menu__item global-menu__item--demo-2" href="#">Блог</a>
						<a className="global-menu__item global-menu__item--demo-2" href="#">Полезное</a>
						<a className="global-menu__item global-menu__item--demo-2" href="#">Войти</a>
					</div>
				</div>
				<svg className="shape-overlays" viewBox="0 0 100 100" preserveAspectRatio="none">
					<path className="shape-overlays__path"></path>
					<path className="shape-overlays__path"></path>
					<path className="shape-overlays__path"></path>
					<path className="shape-overlays__path"></path>
				</svg>
			</div>
		</main>
	</div>
  );
};

export default Menu;
