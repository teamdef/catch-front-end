import { ModalProps } from 'hooks/useModal';
import { cloneElement, useEffect } from 'react';
import styled from 'styled-components';

const Dialog = ({ contents, closeModal }: ModalProps) => {
  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    body.style.overflowY = 'hidden';
    return () => {
      body.style.overflowY = 'auto';
    };
  }, []);
  return <ModalWrapper onClick={(e) => e.stopPropagation()}>{cloneElement(contents, { closeModal })}</ModalWrapper>;
};

const ModalWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export default Dialog;
