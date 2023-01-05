import styled from 'styled-components';
import Link from 'next/link'

interface LoadingProps {
  size?: number;
  color?: string;
}
const Logo = ({ size, color }: LoadingProps) => {
  return (
    <Link href="/" passHref >
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
  font-size: ${(props) => props.size || '1.5rem'}; /* 로고 사이즈는 1.5rem으로 고정*/
  font-family: 'RixInooAriDuriR';
  text-decoration: none;
  /*line-height:1.5rem;*/
  color: ${(props) => props.color || '#ff4d57'};
  &:hover {
    filter: brightness(155%);
    cursor: pointer;
  }
  &:active {
    filter: brightness(85%);
  }
  display:flex;
  align-items:center;
`;

export default Logo;
