import styled from 'styled-components';

interface ButtonProps {
  bgColor?: string;
  fontColor?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  children?: React.ReactNode;
  [x: string]: any; // ...rest 처리 부분 
}
const Button = ({
  bgColor = '#d6d6d6',
  fontColor = 'rgb(59,59,59)',
  fontSize = '10px',
  width,
  height,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <CustomButton {...rest} bgColor={bgColor} fontColor={fontColor} width={width} height={height} fontSize={fontSize}>
      {children}
    </CustomButton>
  );
};

interface ColorProps {
  bgColor?: string;
  fontColor?: string;
  width?: string;
  height?: string;
  fontSize?: string;
}
const CustomButton = styled.button<ColorProps>`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.fontColor};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  border: none;
  border-radius: 2rem;
  font-weight: bold;
  display:flex;
  align-items:center;
  justify-content:center;
  &:hover {
    cursor: pointer;
  }
`;
export default Button;
