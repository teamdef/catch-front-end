import styled from 'styled-components';
import Link from 'next/link';

interface Props {
  height?: string;
}
const Logo = ({ height }: Props) => {
  return (
    <Link href="/" passHref>
      <a>
        <LogoImg height={height} src="/assets/img/rebranding/catchcatch_logo_rebranding.png" />
      </a>
    </Link>
  );
};

const LogoImg = styled.img<Props>`
  height: ${({ height }) => height ?? '24px'};
  display: block;
`;
export default Logo;
