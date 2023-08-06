import { SmallContainedBtn, SmallOutlinedBtn } from 'components/style/button';
import { ModalProps } from 'hooks/useModal';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styled from 'styled-components';

const LeaveServiceModal = ({ closeModal }: { closeModal?: ModalProps['closeModal'] }) => {
  const { nickName } = useSelector((state: RootState) => state.user);
  return (
    <Wrapper>
      <Title>회원탈퇴</Title>
      <ColorText>
        {nickName}님,
        <br />
        정말 떠나시는 건가요?
      </ColorText>
      <NormalText>
        저희 서비스를 탈퇴하신다니 너무 아쉽네요.
        <br />더 보완된 기능과 서비스 품질로 다시 찾아뵐 수 있으면 좋겠습니다.
      </NormalText>
      <ColorText>회원 탈퇴시 아래 내용을 반드시 확인해 주세요.</ColorText>
      <NoticeList>
        <Notice>회원 탈퇴 시 등록된 회원정보는 삭제되지만, 등록된 퀴즈는 삭제되지 않고 유지됩니다.</Notice>
        <Notice>사용자의 정보는 기본 프로필 사진, 탈퇴한 사용자로 표시됩니다.</Notice>
        <Notice>데이터 삭제를 원하실 경우 모든 데이터를 삭제한 뒤 탈퇴하시길 바랍니다.</Notice>
      </NoticeList>
      <ButtonBox>
        <SmallContainedBtn onClick={closeModal}>취소하기</SmallContainedBtn>
        <SmallOutlinedBtn>탈퇴하기</SmallOutlinedBtn>
      </ButtonBox>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  padding: 80px 18px;
  word-break: keep-all;
`;
const Title = styled.h2`
  margin-bottom: 28px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.blackColors.grey_900};
  font-size: ${({ theme }) => theme.fontSize.subtitle_2};
`;
const ColorText = styled.p`
  color: ${({ theme }) => theme.colors.secondary_500};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
const NormalText = styled.p`
  color: ${({ theme }) => theme.colors.blackColors.grey_900};
  font-size: ${({ theme }) => theme.fontSize.caption};
  margin-top: 10px;
  margin-bottom: 42px;
`;
const NoticeList = styled.ul`
  margin-top: 24px;
  flex-grow: 1;
`;
const Notice = styled.li`
  margin-bottom: 10px;
  display: flex;
  align-items: start;
  color: ${({ theme }) => theme.colors.blackColors.grey_900};
  font-size: ${({ theme }) => theme.fontSize.caption};
  &::before {
    content: '';
    position: relative;
    flex: none;
    display: block;
    width: 16px;
    height: 16px;
    margin-right: 12px;
    background: url(/assets/img/rebranding/icon/notice_icon.svg) no-repeat center;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  gap: 20px;
  button {
    flex: 1;
  }
`;
export default LeaveServiceModal;
