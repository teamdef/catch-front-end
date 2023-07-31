import React from 'react';
import styled from 'styled-components';
import { ShareInfo } from './ShareBox';

const Facebook = ({ id }: { id: ShareInfo['id'] }) => {
  const BASEURL: string = process.env.NEXT_PUBLIC_FRONTEND as string;

  const goFacebook = () => {
    window.open(
      `http://www.facebook.com/sharer.php?u=${BASEURL}/${id}/?utm_source=facebook&utm_medium=share&utm_campaign=funnel`,
    );
  };

  return <Button onClick={goFacebook} />;
};

const Button = styled.button`
  background-image: url(/assets/img/rebranding/icon/facebook.svg);
`;
export default Facebook;
