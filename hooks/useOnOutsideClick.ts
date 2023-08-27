import { RefObject, useEffect } from 'react';

const useOnOutsideClick = (
  callback: () => void,
  mainRef: RefObject<HTMLDivElement>, // 이벤트를 발생시키지 않을 메인 컴포넌트
  exceptRefs: RefObject<HTMLDivElement>[], // 이벤트를 발생시키지 않을 추가 컴포넌트 배열
) => {
  /* 제외 할 컴포넌트에 Ref 를 걸어서 그 값을 배열로 담을 것.  */
  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    // click 이벤트가 등록한 ref가 아닐 경우 callback 을 실행하는 함수

    const closeOnOutsideClick = (e: MouseEvent): void => {
      if (mainRef?.current && !mainRef.current.contains(e.target as Node)) {
        // mainRef 컴포넌트가 등록되어 있으나 (활성화 되어 있으나) 클릭 이벤트가 발생한 영역이 mainRef 가 아닐 경우
        if (exceptRefs.length !== 0) {
          // exceptRefs 에 등록된 요소가 하나라도 있다면
          const result: boolean = exceptRefs.reduce((acc: boolean, cur: RefObject<HTMLDivElement>) => {
            const curIsContain: boolean = !cur.current?.contains(e.target as Node);
            return acc && curIsContain; // 현재 값인 cur가 ref이외의 컴포넌트인지 체크하고, 그 결과 값을 acc 값과 연산하여 다시 acc에 저장
          }, true); // 초기 값은 true로 시작함. && 연산이기 때문에.
          if (result) callback();
        }
      }
    };
    body.addEventListener('mousedown', closeOnOutsideClick);
    return () => {
      body.removeEventListener('mousedown', closeOnOutsideClick);
    };
  }, [mainRef, exceptRefs]);
};
export default useOnOutsideClick;
