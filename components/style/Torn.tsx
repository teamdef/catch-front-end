import styled from 'styled-components';

const Torn = styled.div<{ marginTop?: string }>`
  margin-top: ${({ marginTop }) => marginTop && marginTop};
  position: relative;
  border-radius: 8px;
  padding: 25px 20px 0;
  background: #fff;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    margin-left: 20px;
    width: calc(100% - 20px);
    height: 25px;
    background-image: url(/assets/img/rebranding/icon/torn_sticker.svg);
    background-repeat: space;
  }
`;

export default Torn;
