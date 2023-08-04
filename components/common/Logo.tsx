import styled from 'styled-components';
import Link from 'next/link';

interface Props {
  width?: string;
}
const Logo = ({ width }: Props) => {
  return (
    <Link href="/" passHref>
      <a>
        <LogoImg width={width} src="/assets/img/rebranding/catchcatch_logo_rebranding.png" />
      </a>
    </Link>
  );
};

const LogoImg = styled.img<Props>`
  width: ${({ width }) => width ?? '127px'};
  display: block;
`;
export default Logo;
