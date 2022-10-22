import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { useModal } from 'hooks';
import NickNameModal from 'components/modal/NickNameModal';
const Page: NextPageWithLayout = () => {

  const 등록함수 = (text: string) => {
    console.log(text);
  };
  const [openModal, closeModal, RenderModal] = useModal({
    escClickable: false,
    backgroundClickable: false,
    yesTitle: '확인',
    yesAction: () => {
      closeModal();
    },
    contents: <NickNameModal speak={등록함수} />,
  });
  return (
    <div>
      <RenderModal />
      <button onClick={openModal}>열기</button>
    </div>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Page;
