import { useEffect } from 'react';

/* ESC 클릭 시 모달을 닫도록 하는 커스텀 훅  */
const useOnEscapeClick = (callback: () => void) => {
  const body = document.querySelector('body') as HTMLBodyElement;
  useEffect(() => {
    type Listener = (this: HTMLElement, ev: KeyboardEvent) => any; // 키보드 클릭 리스너
    const closeOnEscapeKey: Listener = (e: KeyboardEvent) => (e.key === 'Escape' ? callback() : null);
    body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [callback]);
};
export default useOnEscapeClick;
