import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';
interface TitleProps {
  backRoute: string;
  title: string;
  subTitle: string;
}
const Title = ({ backRoute, title, subTitle }: TitleProps) => {
  return (
    <Wrapper>
      <div id="back-btn-wrapper">
        <Link href={backRoute} passHref>
          <a>
            <IoIosArrowBack size={30} />
          </a>
        </Link>
      </div>
      <div id="title-container">
        <div id="main-title">{title}</div>
        <div id="sub-title">{subTitle}</div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 1rem;
  #back-btn-wrapper {
    padding: 1rem;
    button {
      background-color: transparent;
      border: none;
    }
  }
  #title-container {
    width:85%;
    margin:0 auto;
    #main-title {
      font-size: 24px;
      font-weight: bold;
      color: #3b3b3b;
      margin-bottom: 0.5rem;
    }
    #sub-title {
      color: #888;
    }
  }
`;

export default Title;

// 서비스 footer 작성필요
