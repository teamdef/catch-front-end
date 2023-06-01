import { useState, useEffect } from 'react';

const useScroll = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const handleScroll = () => setIsScrolled(window.scrollY > 0);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll); // 스크롤 이벤트 등록
    return () => {
      window.removeEventListener('scroll', handleScroll); // 스크롤 이벤트 제거
    };
  }, []);
  return isScrolled;
};

export default useScroll;