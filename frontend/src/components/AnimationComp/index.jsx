import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';

const AnimatedComponent = ({ children }) => {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false); // Флаг для отслеживания, проигрывалась ли анимация

  useEffect(() => {
    const handleScroll = () => {
      const element = ref.current;
      if (element && !hasAnimated) { // Проверка, если анимация еще не проигрывалась
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          element.classList.add('active');
          setHasAnimated(true); // Устанавливаем флаг, чтобы анимация не повторялась
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Проверка при загрузке

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasAnimated]);

  return (
    <div ref={ref} className="animation">
      {children}
    </div>
  );
};

export default AnimatedComponent;
