import { useState, useCallback, ChangeEvent } from 'react';

// 제네릭을 사용하여 다양한 타입을 지원하는 input handler 구현

const useInput = <T>(
  initialState: T,
  callback?: (e: ChangeEvent<HTMLInputElement>) => T)
  : [T, (value:T)=>void, ()=>void,(e: ChangeEvent<HTMLInputElement>) => void] => {
  const [value, setValue] = useState<T>(initialState);

  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = callback ? callback(e) : (e.target.value as unknown as T);
    /* 기본적으로 e.target.value 는 string 타입을 가지고 있기 때문에 이를 unknown 타입으로 단언하여, 어떤 타입이든 사용할 수 있게끔 한다.
    그리고 그 값을 제네릭 T로 타입 단언하여 타입이 unknown인 변수를 확정해준다. 
     */
    setValue(targetValue);
  }, []);
  const Setter = useCallback((value: T) => {
    setValue(value);
  }, []);
  
  const clearFunction = useCallback(() => { // 초기화 함수
    setValue(initialState);
  },[])
  return [value, Setter,clearFunction, handler]; // [T, (e: any)=>void]
};

export default useInput;
