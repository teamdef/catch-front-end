import React, { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

const createWrapperAndAppendToBody = (wrapperId: string) => {
  if (document.getElementById(wrapperId)) return document.getElementById(wrapperId) as HTMLDivElement;
  else {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute('id', wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
  }
};

// 'react-portal-modal-container' - 모달 포탈
// 'react-portal-loading-container' - 로딩 포탈
const PortalWrapper = ({
  children,
  wrapperId,
}: {
  children: React.ReactNode;
  wrapperId: string;
}) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    setWrapperElement(createWrapperAndAppendToBody(wrapperId));
    return () => {
      createWrapperAndAppendToBody(wrapperId)?.remove();
    };
  }, [wrapperId]);
  return wrapperElement ? createPortal(children, wrapperElement) : null;
};

export default PortalWrapper;
