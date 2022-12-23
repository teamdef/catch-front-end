// Custom Axios에서 instance만든거 가져와서 사용
import { authAxios, notAuthAxios } from './customAxios';
import { AxiosResponse } from 'axios';

// 최근 생성된 퀴즈 목록
export const RecentQuizListApi = (lastCreatedAt?: string): Promise<AxiosResponse> => {
  if (lastCreatedAt) {
    return notAuthAxios.get('/recentprobset', { params: { createdAt: lastCreatedAt } });
  } else {
    return notAuthAxios.get('/recentprobset');
  }
};

// 특정 퀴즈 id의 퀴즈 자세히 보기
export const MyQuizDetailApi = (probsetId: string): Promise<AxiosResponse> => {
  return authAxios.get(`/probset/detail/${probsetId}`);
};

// 내가 만든 퀴즈 목록
export const UserQuizListApi = (userId: string): Promise<AxiosResponse> => {
  return authAxios.get(`/userprobset/${userId}`);
};

// 특정 퀴즈 id의 퀴즈 삭제
export const QuizDeleteApi = (probsetId: string): Promise<AxiosResponse> => {
  return authAxios.delete(`/probset/${probsetId}`);
};

// 특정 퀴즈 id의 랭킹 조회
export const QuizRankingListApi = (probsetId: string): Promise<AxiosResponse> => {
  return authAxios.get(`/solver/ranking`, { params: { probsetId} });
};

// 생성 - 새로 만든 퀴즈 업로드
export const QuizUploadApi = (
  problems: ProblemTypes[],
  userId: number,
  setTitle: string,
  description: string,
): Promise<AxiosResponse> => {
  return new Promise(async (resolve, reject) => {
    const temp = problems.map((problem: ProblemTypes) => {
      if (problem.choiceType === 'img') {
        let _problem = JSON.parse(JSON.stringify(problem)); // 객체 깊은 복사
        let _choices: string[] = [];
        problem.choices.forEach((img) => {
          const tem = img as unknown as File;
          _choices.push(tem.name);
        });
        _problem.choices = _choices;
        return _problem;
      } else {
        return problem;
      }
    });

    const res: AxiosResponse = await authAxios.post(`/probset`, { setTitle, problems: temp, userId, description });

    const urlArray = res.data.urlArray;
    const returnSetId = res.data.returnSetId;
    const returnThumb = res.data.returnThumb;

    let imageArray: File[] = [];
    problems.forEach((problem: ProblemTypes) => {
      if (problem.choiceType === 'img') {
        const ttt = problem.choices as unknown as File;
        imageArray.push(ttt);
      }
    });

    const flatArr = imageArray.flat();
    if (flatArr.length !== 0) {
      flatArr.forEach(async (imgBlob) => {
        const aaa = urlArray.find((value: any) => value.fileName === imgBlob.name);

        const res2: AxiosResponse = await notAuthAxios.put(aaa.putUrl, imgBlob, {
          headers: { 'Content-Type': imgBlob.type },
        });
      });
    }
    resolve(res);
  });
};
// 특정 id의 퀴즈 썸네일 변경
export const QuizThumbnailChangeApi = async (probsetId: string, imgBlob: File): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    const res: AxiosResponse = await authAxios.post('/thumbnail', { probsetId, thumbnail: imgBlob.name });
    const res2: AxiosResponse = await notAuthAxios.put(res.data, imgBlob, {
      headers: { 'Content-Type': imgBlob.type },
    });
    resolve(res2.status);
  });
};

// 풀이 - 특정 id의 퀴즈 정보 불러오기
export const QuizDataFetchApi = async (probsetId: string): Promise<AxiosResponse> => {
  return notAuthAxios.get(`/loadprobset/${probsetId}`);
};

// 풀이 - 퀴즈 풀이 정보 저장하기 (로그인)
export const LoginUserQuizSolveSaveApi = async (nickName: string, score: number, probsetId: string, userId: string) => {
  return notAuthAxios.post(`/solver`, { nickName, score, probsetId, userId });
};
// (비로그인)
export const NotLoginUserQuizSolveSaveApi = async (nickName: string, score: number, probsetId: string) => {
  return notAuthAxios.post(`/solver`, { nickName, score, probsetId });
};

// 한줄평 - 목록 불러오기
export const CommentListApi = async (probsetId: string) => {
  return notAuthAxios.get(`/comment/${probsetId}`);
};

// 한줄평 - 등록하기
export const CommentSaveApi = async (nickname: string, content: string, probsetId: string, userId:string) => {
  return notAuthAxios.post(`/comment`, { nickname, content, probsetId, userId });
};
