import React from 'react';
import styled from 'styled-components';
import { ShareBtnProps } from './Kakaotalk';

const Facebook = ({ id }: { id: ShareBtnProps['props']['id'] }) => {
  const BASEURL: string = process.env.NEXT_PUBLIC_FRONTEND as string;

  const goFacebook = () => {
    window.open(
      `http://www.facebook.com/sharer.php?u=${BASEURL}/${id}/?utm_source=facebook&utm_medium=share&utm_campaign=funnel`,
    );
  };

  return <Button onClick={goFacebook} />;
};

const Button = styled.button`
  background-image: url(/assets/img/facebook_icon.png);
`;
export default Facebook;
