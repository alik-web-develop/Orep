import React, { useEffect, useRef } from 'react';
import './styles.scss'; // Подключаем стили

const AnimatedComponent = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = ref.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          element.classList.add('active');
        } else {
          element.classList.remove('active');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Проверка при загрузке

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={ref} className="animation">
      {children}
    </div>
  );
};

export default AnimatedComponent;
