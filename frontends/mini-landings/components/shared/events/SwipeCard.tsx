import React from 'react';
import { useSpring, animated } from 'react-spring';

type Props = {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  content: string;
  onClickMore: () => void;
};

const SwipeCard: React.FC<Props> = ({ onSwipeLeft, onSwipeRight, content, onClickMore }) => {
  const [springProps, setSpring] = useSpring(() => ({
    x: 0,
    from: { x: 0 },
  }));

  const handleStart = (clientX: number) => {
    const startX = clientX;

    const onMove = (moveEvent: { clientX: number }) => {
      const deltaX = moveEvent.clientX - startX;
      setSpring({ x: deltaX });
    };

    const onEnd = () => {
      if (springProps.x.get() > 150) {
        onSwipeRight();
      } else if (springProps.x.get() < -150) {
        onSwipeLeft();
      }
      setSpring({ x: 0 });
    };

    return { onMove, onEnd };
  };

  const bindMouse = {
    onMouseDown: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const { onMove, onEnd } = handleStart(event.clientX);

      const onMouseMove = (moveEvent: MouseEvent) => onMove({ clientX: moveEvent.clientX });
      const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        onEnd();
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
  };

  const bindTouch = {
    onTouchStart: (event: React.TouchEvent<HTMLDivElement>) => {
      const { onMove, onEnd } = handleStart(event.touches[0].clientX);

      const onTouchMove = (moveEvent: TouchEvent) => onMove({ clientX: moveEvent.touches[0].clientX });
      const onTouchEnd = () => {
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
        onEnd();
      };

      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onTouchEnd);
    },
  };

  return (
    <animated.div
      {...bindMouse}
      {...bindTouch}
      style={{
        transform: springProps.x.to((x) => `translate3d(${x}px, 0, 0) rotate(${x / 20}deg)`),
        opacity: springProps.x.to((x) => Math.max(0.4, 1 - Math.abs(x / 150)))
      }}
      className="bg-white p-4 rounded-lg shadow-md w-5/6 h-5/6 mx-auto my-auto mt-16 relative"
      >
      <div>{content}</div>
      <button
        onClick={onClickMore}
        className="absolute bottom-2 left-2 bg-blue-500 text-white p-2 rounded"
      >
        Подробнее
      </button>
    </animated.div>
  );
};

export default SwipeCard;
