import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { Title } from 'components/common';
import styled, { css } from 'styled-components';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import notice from 'data/notice.json';

const Page: NextPageWithLayout = () => {
  const noticeData: NoticeTypes[] = notice.notice;

  const newUploadCheck = (date: string): boolean => {
    const _days = (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24);
    return _days < 7;
  };

  return (
    <>
      <Title backRoute="/" title="공지사항 📣" subTitle="서비스 이용에 필요한 내용을 확인하세요" />
      <Wrapper>
        <NoticeList>
          {noticeData.map((item: NoticeTypes, index: number) => {
            return (
              <Notice new={newUploadCheck(item.uploadDate)} key={index}>
                <summary id="notice">
                  <div id="title-container">
                    <div id="title">{item.title}</div>
                    <div id="upload-date">{item.uploadDate}</div>
                  </div>
                  <MdOutlineKeyboardArrowDown size={30} color={'#888'} />
                </summary>
                <textarea id="content" readOnly rows={10}>
                  {item.content}
                </textarea>
              </Notice>
            );
          })}
        </NoticeList>
      </Wrapper>
    </>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 5rem;
`;
const NoticeList = styled.div`
  background-color: white;
  border-radius: 4px;
  margin-top: 1.5rem;
`;

interface noticeProps {
  new: boolean;
}
const Notice = styled.details<noticeProps>`
  cursor: pointer;
  color: #595959;
  &:nth-last-child(1) {
    border: none;
  }
  padding: 1rem 1rem 0 1rem;
  #notice {
    padding-bottom: 1rem;
    border-bottom: solid 1px #eee;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &::-webkit-details-marker {
      display: none;
    }
    #title-container {
      #title {
        font-size: 18px;
        position: relative;
        &:after {
          ${(props) =>
            props.new &&
            css`
              content: 'N';
              color: #fff;
              background: #ff4d57;
              border-radius: 6px;
              font-size: 10px;
              font-weight: 100;
              margin-left: 6px;
              padding: 2px 5px 2px 5px;
              position: absolute;
              top: 5px;
            `}
        }
      }
      #upload-date {
        color: #d6d6d6;
        font-size: 300;
        margin-top: 4px;
      }
    }
  }
  &[open] {
    #title {
      font-weight: bold;
      color: #000;
    }
    svg {
      transform: rotate(180deg);
    }
  }
  #content {
    font-size: 14px;
    padding: 1rem;
    background-color: #f8f8f8;
    border: none;
    resize: none;
    width: 100%;
    outline: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export default Page;
