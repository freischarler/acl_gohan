import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useFadeInOnScroll = () => {
  const location = useLocation();

  useEffect(() => {
    const fadeInElements = document.querySelectorAll('.fade-in, .fade-in-2, .fade-in-25, .fade-in-right, .fade-in-left, .scale-up');

    const handleScroll = () => {
      fadeInElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          element.classList.add('visible');
        } else {
          element.classList.remove('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]); // Re-run the effect when the location changes
};
