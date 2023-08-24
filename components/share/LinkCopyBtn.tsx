/* eslint-disable no-alert */
import React from 'react';
import styled from 'styled-components';
import { ShareInfo } from './ShareBox';

const LinkCopyBtn = ({ id }: { id: ShareInfo['id'] }) => {
  const BASEURL: string = process.env.NEXT_PUBLIC_FRONTEND as string;
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었습니다.');
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
  };

  return (
    <Button
      onClick={() => {
        handleCopyClipBoard(`${BASEURL}/quiz/solve/${id}/?utm_source=link&utm_medium=share&utm_campaign=funnel`);
      }}
    />
  );
};

const Button = styled.button`
  background-image: url(/assets/img/rebranding/icon/link.svg);
`;

export default LinkCopyBtn;
