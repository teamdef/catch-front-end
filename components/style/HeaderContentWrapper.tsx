import styled from 'styled-components';

const HeaderContentWrapper = styled.div<{ paddingTop?: string }>`
  position: relative;
  display: flex;
  padding-top: ${({ paddingTop }) => paddingTop};
  flex-direction: column;
  min-height: calc(100vh - 84px);
`;
export default HeaderContentWrapper;
