import styled from 'styled-components';

interface Props {
  src: string;
  width?: string;
  height?: string;
  onClick?: () => void;
}
const Icon = ({ src, width, height, onClick }: Props) => {
  // onload, onerror 처리 필요
  return (
    <Wrapper width={width} height={height} onClick={() => onClick?.()}>
      <img src={src} />
    </Wrapper>
  );
};

const Wrapper = styled.div<Omit<Props, 'src'>>`
  width: ${({ width }) => width ?? 'auto'};
  height: ${({ height }) => height ?? 'auto'};
  display: block;
  ${({ theme }) => theme.mixin.flex()} /* mixin 사용 */
  cursor:${({ onClick }) => (onClick ? 'pointer' : 'none')};
`;
export default Icon;
