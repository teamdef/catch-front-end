import styled from 'styled-components';

interface NotFoundProps {
  title: string;
  subTitle: string;
}

const NotFound = ({ title, subTitle }: NotFoundProps) => {
  return (
    <Wrapper>
      <img src={'/assets/img/catch_character2.png'} alt={'logo'} />

      <div id="title">{title}</div>
      <div id="subTitle">{subTitle}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width:100%;
  img {
    width: 70%;
  }
  #title {
    font-size: 18px;
    color: #595959;
    padding-bottom: 8px;
  }
  #subTitle {
    color: #d6d6d6;
    font-weight: 300;
  }
`;
export default NotFound;
