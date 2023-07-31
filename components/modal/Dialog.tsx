import { ModalProps } from 'hooks/useModal';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const Dialog = ({ contents, closeModal }: ModalProps) => {
  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    body.style.overflowY = 'hidden';
    return () => {
      body.style.overflowY = 'auto';
    };
  }, []);
  return (
    <ModalWrapper onClick={(e) => e.stopPropagation()}>
      <ModalBody>{React.cloneElement(contents, { closeModal })}</ModalBody>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  z-index: 1;
`;

const ModalBody = styled.div``;

export default Dialog;
