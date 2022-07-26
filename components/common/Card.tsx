import styled from 'styled-components';

interface CardProps {
  width?: string;
  height?: string;
  radius?: string;
  bgColor?: string;
  children?: React.ReactNode;
}

const Card = ({ width = '100%', height = 'auto', radius = '4px', bgColor = 'white',children, ...rest }: CardProps) => {
  return (
    <Wrapper {...rest} width={width} height={height} radius={radius} bgColor={bgColor}>
      {children}
    </Wrapper>
  );
};

interface CardStyleProps {
  width?: string;
  height?: string;
  radius?: string;
  bgColor?: string;
}
const Wrapper = styled.div<CardStyleProps>`
  display: flex;
  position: relative;
  background-color: ${(props) => props.bgColor};
  border-radius: ${(props) => props.radius};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
  padding: 1rem;
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.025);
  }
`;

export default Card;
