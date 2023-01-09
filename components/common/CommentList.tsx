import styled,{keyframes} from 'styled-components';
import { NotFound } from 'components/common';
interface CommentType {
  content: string;
  created_at: string;
  nickname: string;
  user: any;
}
interface CommentBoardProps {
  commentList: CommentType[] | null;
}
const CommentList = ({ commentList }: CommentBoardProps) => {
  const postDate = (_createDate:string) => {
    let date1 = new Date(); // 현재 일자
    let date2 = new Date(_createDate); // 파일 생성일자
    // 일자의 격차 구하기
    const diffDate = date1.getTime() - date2.getTime();
    // 분 단위로 변경
    let diffMin = diffDate / (1000 * 60);
    let diffDay = diffMin / 1440;
    let diffWeek = diffDay / 7;
    let diffMon = diffDay / 30;
    let diffYear = diffDay / 365;
    // 게시일자 별 멘트
    if (diffMin < 1) {
      return "방금 전";
    } else if (diffMin < 60) {
      // 1 시간 이내
      return diffMin + "분 전";
    } else if (diffMin > 60 && diffMin < 1440) {
      // 1시간 ~ 24시간 이내 60m ~ 1440m
      return diffMin / 60 + "시간 전";
    } else if (1 <= diffDay && diffDay < 3) {
      // 하루 전 ~ 이틀 전
      if (2 <= diffDay) return "이틀 전";
      else return "하루 전";
    } else if (3 <= diffDay && 7 > diffDay) {
      // 3일 전 ~ 1주일 이내
      return Math.floor(diffDay) + "일 전";
    } else if (1 <= diffWeek && 4 > diffWeek) {
      // n주 전
      return Math.floor(diffWeek) + "주 전";
    } else if (1 <= diffMon && 12 > diffMon) {
      // 1년 이내
      return Math.floor(diffMon)+ "개월 전";
    }
    return Math.floor(diffYear) + "년 전";
  };
  return (
    <CommentBoardWrapper>
      {commentList ? (
        commentList.length !== 0 ? (
          commentList.map((item: any, index: number) => (
            <CommentBox key={index}>
              <img src={item.img ? item.img : '/assets/img/user_default.png'}></img>
              <div>
                <span className="nickname">{item.nickname}</span>
                <p>{item.content}</p>
              </div>
              <span className="date">{postDate(item.created_at)}</span>
            </CommentBox>
          ))
        ) : (
          <NotFound title={'아직 작성된 한줄평이 없습니다 😶'} subTitle={'한줄평이 작성될 때 까지 기다려볼까요?'} />
        )
      ) : (
        <div>
          <SkeletonCommentBox>
            <div id="img-container"></div>
            <div>
              <span className="nickname"></span>
              <p></p>
            </div>
            <span className="date"></span>
          </SkeletonCommentBox>
          <SkeletonCommentBox>
            <div id="img-container"></div>
            <div>
              <span className="nickname"></span>
              <p></p>
            </div>
            <span className="date"></span>
          </SkeletonCommentBox>
          <SkeletonCommentBox>
            <div id="img-container"></div>
            <div>
              <span className="nickname"></span>
              <p></p>
            </div>
            <span className="date"></span>
          </SkeletonCommentBox>
        </div>
      )}
    </CommentBoardWrapper>
  );
};

const CommentBoardWrapper = styled.div`
  position: relative;
  margin-top: 5%;
  width: 100%;

  .more {
    border: none;
    width: 100%;
    padding: 5px;
    margin: 5% 0;
    border-radius: 10px;
    background-color: #fff6f7;
  }
`;
const gradient = keyframes` 
  0% {background-color: rgba(165, 165, 165, 0.1);}
  50% {background-color: rgba(165, 165, 165, 0.3);}
  100% {background-color: rgba(165, 165, 165, 0.1);}
`;
const CommentBox = styled.div`
  position: relative;
  display: flex;
  color: #555;
  font-size: 0.9rem;
  margin-bottom: 5%;
  img {
    position: relative;
    display: block;
    width: 38px;
    height: 38px;
    margin-right: 20px;
    border-radius: 50%;
  }
  > div {
    position: relative;
    display: block;
    span {
      display: block;
      font-size: .85rem;
      margin: 4px 0 8px 0;
    }
    p {
      display: block;
      padding: 15px 18px;
      font-size: 1rem;
      background: #f4f4f4;
      border-radius: 0px 15px 15px 15px;
      /*line-height: 1.2rem;*/

    }
  }
  .date {
    position: relative;
    display: block;
    color: #888;
    font-size: 0.5rem;
    white-space: nowrap;
    align-self: flex-end;
    padding-left: 5px;
  }
`;

const SkeletonCommentBox = styled(CommentBox)`
  #img-container {
    position: relative;
    display: block;
    width: 38px;
    height: 38px;
    margin-right: 20px;
    border-radius: 50%;
    background-color: #d6d6d6;
    animation: ${gradient} 1.5s linear infinite alternate;
  }
  > div {
    span {
      background-color: #d6d6d6;
      border-radius: 12px;
      width: 100px;
      height: 0.9rem;
      animation: ${gradient} 1.5s linear infinite alternate;
    }
    p {
      border-radius: 0px 15px 15px 15px;
      width: 200px;
      height: 50px;
      background-color: #d6d6d6;
      animation: ${gradient} 1.5s linear infinite alternate;
    }
  }
  .date {
    background-color: #d6d6d6;
    border-radius: 12px;
    width: 70px;
    height: 0.6rem;
    animation: ${gradient} 1.5s linear infinite alternate;
  }
`;

export default CommentList;
