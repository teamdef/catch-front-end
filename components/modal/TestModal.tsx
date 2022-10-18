import React, { useEffect, RefObject, useRef, MouseEvent } from 'react';
import { useInput } from 'hooks';
/* 이 Modal 컴포넌트는 ReactDom.createPortal 로 관리 될 예정임. */
interface TestProps {
  speak: (arg0: string) => void;
}
const Test = ({ speak }: TestProps) => {
  const [text, , , textHandler] = useInput<string>('');

  return (
    <div>
      닉넴입력 ::::: <input type="text" value={text} onChange={textHandler} />
      <button
        onClick={() => {
          speak(text);
        }}
      />
    </div>
  );
};

export default Test;
