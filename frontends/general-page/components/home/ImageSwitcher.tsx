import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export default function ImageSwitcher() {
  const imageRef = useRef<any>();

  // КОСТЫЛЬНАЯ ШТУКА, зачем она нужна?
  // При наложении изображений в анимации остается место от предыдущего расположения
  // накладываемого изображения и соответственно блок после анимации сдвинут на {размер изображения}px
  // Чтобы это пофиксить, добавляю mb по размеру изображения, который высчитываю когда изображение подгружается
  // Но при изменении окра браузера mb не перерасчитывается, поэтому добавил хук с перерасчетом при ресайзе
  useEffect(() => {
    const handleResize = () => {
      if (imageRef.current) {
        imageRef.current.style.marginBottom = `-${imageRef.current.offsetHeight}px`;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="">
      <motion.div
        initial="hidden"
        animate={{ opacity: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        variants={variants}
      >
        <Image src="/image1.svg" layout="responsive" alt="Описание изображения 1" width={500} height={300} className="object-cover" 
            onLoad={() => {
              if (imageRef.current) {
                  imageRef.current.style.marginBottom = `-${imageRef.current.offsetHeight}px`;
                  }
            }}/>
      </motion.div>
      <motion.div
        initial="visible"
        animate={{ opacity: [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1] }}
        transition={{ duration: 15, repeat: Infinity }}
        variants={variants}
        ref={imageRef}
        className="w-full transform -translate-y-full"
     >
        <Image src="/image2.svg" layout="responsive" alt="Описание изображения 2" width={500} height={300} className="object-cover"
                 onLoad={() => {
                  if (imageRef.current) {
                    imageRef.current.style.marginBottom = `-${imageRef.current.offsetHeight}px`;
                  }
                }} />
      </motion.div>
    </div>
  );
}