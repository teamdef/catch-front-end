import styled from 'styled-components';

const Sketchbook = styled.div`
  position: relative;
  border-radius: 8px;
  border: 0.75px solid #00fba5;
  background: #fff;
  padding: 0 16px;
  box-shadow: 1px -2px 0px 0px #00fba5;
  &::before {
    content: '';
    position: absolute;
    top: -29px;
    left: 0;
    margin: 0 20px;
    width: calc(100% - 40px);
    height: 54px;
    background-image: url('/assets/img/rebranding/anyquiz/spring.svg');
    background-repeat: space;
  }
`;
export default Sketchbook;
