import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout, HeaderLayout } from 'components/layout';
import { Title } from 'components/common';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import notice from 'data/notice.json';
import * as S from 'styles/notice.style';

const Page: NextPageWithLayout = () => {
  const noticeData: NoticeTypes[] = notice.notice;
  const newUploadCheck = (date: string): boolean => {
    const _days = (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24);
    return _days < 7;
  };

  return (
    <>
      <Title title="공지사항 📣" subTitle="서비스 이용에 필요한 내용을 확인하세요" />
      <S.Wrapper>
        <S.NoticeList>
          {noticeData.map((item: NoticeTypes, index: number) => {
            return (
              <S.Notice new={newUploadCheck(item.uploadDate)} key={index}>
                <summary id="notice">
                  <div id="title-container">
                    <div id="title">{item.title}</div>
                    <div id="upload-date">{item.uploadDate}</div>
                  </div>
                  <MdOutlineKeyboardArrowDown size={30} color={'#888'} />
                </summary>
                <textarea id="content" readOnly rows={10} value={item.content} />
              </S.Notice>
            );
          })}
        </S.NoticeList>
      </S.Wrapper>
    </>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default Page;
