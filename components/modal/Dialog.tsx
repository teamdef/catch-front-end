import { ModalProps } from 'hooks/useModal';
import { cloneElement } from 'react';
import styled from 'styled-components';

const Dialog = ({ contents, closeModal }: ModalProps) => {
  return <ModalWrapper onClick={(e) => e.stopPropagation()}>{cloneElement(contents, { closeModal })}</ModalWrapper>;
};

const ModalWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export default Dialog;
