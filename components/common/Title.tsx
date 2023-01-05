import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface TitleProps {
  isBack?: boolean;
  title: string;
  subTitle: string;
}
const Title = ({ isBack, title, subTitle }: TitleProps) => {
  const [prevPath, setPrevPath] = useState<string>();
  useEffect(() => {
    setPrevPath('/'); // 이전 라우터가 없으면 홈으로 세팅
    // const storage = globalThis?.sessionStorage;
    // if (!storage) return;
    // else {
    //   console.log(storage.getItem('prevPath'))
    //   if (storage.getItem('prevPath')) {
    //     const _prevPath = storage.getItem('prevPath') as string;
    //     setPrevPath(_prevPath); // 이전 라우터가 있으면 그걸로 세팅
    //   } else {
    //     setPrevPath('/'); // 이전 라우터가 없으면 홈으로 세팅
    //   }
    // }
  }, []);

  return (
    <Wrapper>
      {isBack && (
        <div id="back-btn-wrapper">
          <Link href={prevPath || "/"} passHref>
            <a>
              <IoIosArrowBack size={30} color={'#595959'} />
            </a>
          </Link>
        </div>
      )}
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
    width: 85%;
    margin: 0 auto;
    #main-title {
      font-size: 24px;
      font-weight: bold;
      color: #595959;
      margin-bottom: 0.5rem;
    }
    #sub-title {
      color: #888;
      /*line-height: 1.5rem;*/
      word-break: keep-all;
    }
  }
`;

export default Title;
