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

  const bind = {
    onMouseDown: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const startX = event.clientX;

      const onMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startX;
        setSpring({ x: deltaX });
      };

      const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);

        if (springProps.x.get() > 150) {
          onSwipeRight();
        } else if (springProps.x.get() < -150) {
          onSwipeLeft();
        }
        setSpring({ x: 0 });
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
  };

  return (
    <animated.div
      {...bind}
      style={{
        transform: springProps.x.to((x) => `translateX(${x}px)`),
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
