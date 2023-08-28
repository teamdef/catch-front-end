import { ModalProps } from 'hooks/useModal';
import { cloneElement } from 'react';
import styled from 'styled-components';

const Dialog = ({ contents, closeModal, triggerAnimation }: ModalProps) => {
  return (
    <ModalWrapper triggerAnimation={triggerAnimation} onClick={(e) => e.stopPropagation()}>
      {cloneElement(contents, { closeModal })}
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div<{ triggerAnimation: boolean }>`
  position: relative;
  width: 100%;
  display: ${({ triggerAnimation }) => (triggerAnimation ? 'block' : 'none')};
`;

export default Dialog;
