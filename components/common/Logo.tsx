import styled from 'styled-components';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" passHref>
      <LogoImg  src={'/assets/img/rebranding/catchcatch_logo_rebranding.png'} />
    </Link>
  );
};

const LogoImg = styled.img`
  width: 127px;
`;
export default Logo;
