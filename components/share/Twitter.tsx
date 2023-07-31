import styled from 'styled-components';
import { ShareInfo } from './ShareModal';

const Twitter = ({ shareInfo }: { shareInfo: ShareInfo }) => {
  const { setTitle, id, nickName } = shareInfo;
  const BASEURL: string = process.env.NEXT_PUBLIC_FRONTEND as string;

  const goTwitter = () => {
    // "https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl
    // 캐치캐치에 접속해서 해당 퀴즈를 풀어보고 결과를 확인해보세요!
    const sendText = `[📢 캐치캐치] ${nickName}님이 만든 ${setTitle} 퀴즈를 풀어보세요!🤔 링크를 클릭하면 캐치캐치 퀴즈 풀이 화면으로 바로 이동됩니다.😊🥰 `;
    const sendUrl = `${BASEURL}/quiz/solve/${id}/?utm_source=twitter&utm_medium=share&utm_campaign=funnel`;
    const hashtags = `캐치캐치,퀴즈,나만의퀴즈 `;
    window.open(`https://twitter.com/intent/tweet?text=${sendText}&url=${sendUrl}&hashtags=${hashtags}`);
  };

  return <Button onClick={goTwitter} className="twitter-btn" />;
};
const Button = styled.button`
  background-image: url(/assets/img/twitter_icon.webp);
`;
export default Twitter;
