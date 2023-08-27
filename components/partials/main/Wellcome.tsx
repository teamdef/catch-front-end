import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { MainText } from './LoginText';

const Wellcome = () => {
  const { nickName } = useSelector((state: RootState) => state.user);
  return (
    <MainText>
      안녕하세요,
      <br />
      <b>{nickName}</b> 님!
    </MainText>
  );
};

export default Wellcome;
