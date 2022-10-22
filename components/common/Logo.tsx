import styled from 'styled-components';
import Link from 'next/link'

interface LoadingProps {
  size?: number;
  color?: string;
}
const Logo = ({ size, color }: LoadingProps) => {
  return (
    <Link href="/" passHref>
      <Wrapper size={size} color={color}>
        캐치캐치
      </Wrapper>
    </Link>
  );
};

interface LogoProps {
  size?: number;
  color?: string;
}

const Wrapper = styled.a<LogoProps>`
  font-size: ${(props) => props.size || '1.5rem'};
  font-family: 'RixInooAriDuriR';
  text-decoration: none;
  color: ${(props) => props.color || '#ff4d57'};
  &:hover {
    filter: brightness(155%);
    cursor: pointer;
  }
  &:active {
    filter: brightness(85%);
  }
`;

export default Logo;
