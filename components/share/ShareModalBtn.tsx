import { LargeOutlinedBtn } from 'components/style/button';
import { useModal } from 'hooks';
import { ShareModal } from '.';

const ShareModalBtn = () => {
  const [openModal, , RenderModal] = useModal({
    escClickable: true,
    backgroundClickable: true,
    bottomSheet: true,
    contents: <ShareModal />,
  });
  return (
    <LargeOutlinedBtn onClick={openModal}>
      <img src="/assets/img/rebranding/icon/share_icon.svg" alt="공유버튼아이콘이미지" />
      퀴즈 공유하기
      <RenderModal />
    </LargeOutlinedBtn>
  );
};

export default ShareModalBtn;
