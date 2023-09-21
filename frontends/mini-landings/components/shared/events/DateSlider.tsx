import React, { useState, useEffect, useRef } from 'react';
import './DateSlider.css';

interface Props {
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
}

const DateSlider: React.FC<Props> = ({ setStartDate, setEndDate }) => {

    const getPosFromDate = (dateString: string) => {
        const startDate = new Date(Date.UTC(2023, 8, 1));
        const endDate = new Date(dateString + "T00:00:00Z");  // Подразумеваем UTC
        const timeDiff = endDate.getTime() - startDate.getTime();
        const dayDiff = timeDiff / (1000 * 60 * 60 * 24);
        return (dayDiff / 365) * 100;
    };

    const [startPos, setStartPos] = useState(getPosFromDate(new Date().toISOString().slice(0, 10)));
    const [endPos, setEndPos] = useState(100);
    const [sliderWidth, setSliderWidth] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isActiveStart, setIsActiveStart] = useState(false);
    const [isActiveEnd, setIsActiveEnd] = useState(false);

    useEffect(() => {
        if (sliderRef.current) {
            setSliderWidth(sliderRef.current.offsetWidth);
        }
    }, []);

    const humanReadableDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', options);
    };


    const getDateFromPos = (pos: number) => {
        const date = new Date(Date.UTC(2023, 8, 1));
        date.setUTCDate(date.getUTCDate() + Math.floor((pos / 100) * 365));
        return date.toISOString().slice(0, 10);
    };


    const handleMove = (type: 'start' | 'end', clientX: number) => {
        const rect = sliderRef.current?.getBoundingClientRect();
        const actualX = clientX - (rect?.left || 0);
        let xPos = (actualX / sliderWidth) * 100;

        // Ограничение движения внутри слайдера
        if (xPos < 0) xPos = 0;
        if (xPos > 100) xPos = 100;

        // Предотвращение пересечения маркеров
        if (type === 'start' && xPos >= endPos) {
            xPos = endPos - 1; // -1 чтобы не допустить пересечения
        }
        if (type === 'end' && xPos <= startPos) {
            xPos = startPos + 1; // +1 чтобы не допустить пересечения
        }

        if (type === 'start') {
            setStartDate(getDateFromPos(xPos));
            setStartPos(xPos);
        } else {
            setEndDate(getDateFromPos(xPos));
            setEndPos(xPos);
        }
    };

    const handleTouchMove = (type: 'start' | 'end', clientX: number) => {
        // Остальная логика остается такой же, как в handleMove
        const rect = sliderRef.current?.getBoundingClientRect();
        const actualX = clientX - (rect?.left || 0);
        let xPos = (actualX / sliderWidth) * 100;

        // Ограничение движения внутри слайдера
        if (xPos < 0) xPos = 0;
        if (xPos > 100) xPos = 100;

        // Предотвращение пересечения маркеров
        if (type === 'start' && xPos >= endPos) {
            xPos = endPos - 1; // -1 чтобы не допустить пересечения
        }
        if (type === 'end' && xPos <= startPos) {
            xPos = startPos + 1; // +1 чтобы не допустить пересечения
        }

        if (type === 'start') {
            setStartDate(getDateFromPos(xPos));
            setStartPos(xPos);
        } else {
            setEndDate(getDateFromPos(xPos));
            setEndPos(xPos);
        }
    };

    const handleTouchStart = (type: 'start' | 'end') => {
        const touchMoveHandler = (e: TouchEvent) => {
            handleTouchMove(type, e.touches[0].clientX);
        };
        const touchEndHandler = () => {
            window.removeEventListener('touchmove', touchMoveHandler);
            window.removeEventListener('touchend', touchEndHandler);
        };
        window.addEventListener('touchmove', touchMoveHandler);
        window.addEventListener('touchend', touchEndHandler);
    };


    const handleMouseDown = (type: 'start' | 'end') => {
        const mouseMoveHandler = (e: MouseEvent) => {
            e.preventDefault();  // добавьте эту строку
            handleMove(type, e.clientX);
        };
        const mouseUpHandler = () => {
            window.removeEventListener('mousemove', mouseMoveHandler);
            window.removeEventListener('mouseup', mouseUpHandler);
            if (type === 'start') {
                setIsActiveStart(false);
            } else {
                setIsActiveEnd(false);
            }
        };
        window.addEventListener('mousemove', mouseMoveHandler);
        window.addEventListener('mouseup', mouseUpHandler);
        if (type === 'start') {
            setIsActiveStart(true);
        } else {
            setIsActiveEnd(true);
        }
    };


    return (
        <div ref={sliderRef} className="date-slider-container">
            <div
                className={`date-slider-thumb ${isActiveStart ? 'active' : ''}`}
                style={{ left: `${startPos}%` }}
                onMouseDown={() => handleMouseDown('start')}
                onTouchStart={() => handleTouchStart('start')}  // добавьте эту строку
            >
                <div className="date-slider-label">{humanReadableDate(getDateFromPos(startPos))}</div>
            </div>
            <div
                className={`date-slider-thumb ${isActiveEnd ? 'active' : ''}`}
                style={{ left: `${endPos}%` }}
                onMouseDown={() => handleMouseDown('end')}
                onTouchStart={() => handleTouchStart('end')}  // и эту строку
            >
                <div className="date-slider-label">{humanReadableDate(getDateFromPos(endPos))}</div>
            </div>

        </div>
    );
};

export default DateSlider;
