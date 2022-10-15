// 문제 생성 화면에서 사용하는 휴대폰 모양 레이아웃

import styled from 'styled-components'
const SmartphoneLayout = (props: { children: React.ReactNode }) => {
  return <Wrapper>{props.children}</Wrapper>;
};

// 기능 가시성을 위한 임시 디자인
const Wrapper = styled.div`
  position: relative;
  background-color: #fff6f7;
  padding: 1rem;
  height: 100vh;
  #inner-wrapper {
    background-color: white;
    height: 100%;
    border-radius: 30px;
    padding: 1rem;
    overflow-y: scroll;
    & {
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
  }
`;

export default SmartphoneLayout;
