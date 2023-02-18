// Custom Axios에서 instance만든거 가져와서 사용
import { authAxios, notAuthAxios } from './customAxios';
import { AxiosResponse } from 'axios';
import imageCompression from 'browser-image-compression'; // 이미지 최적화용

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
  return authAxios.get(`/solver/ranking`, { params: { probsetId } });
};

// imageObject 를 Blob으로 변환하여 S3에 전송하는 함수
const putImageToS3URL = async (urlArray:any, _imageObject: ChoiceImageTypes) => {
  const _foundUrl = urlArray.find((value: any) => value.fileName === _imageObject.imgName);
  const _imageFile = await imageCompression.getFilefromDataUrl(_imageObject.imgURL, _imageObject.imgName) as unknown as File;
  const res = await notAuthAxios.put(_foundUrl.putUrl, _imageFile, {
    headers: { 'Content-Type': _imageFile.type },
  });
};
// 생성 - 새로 만든 퀴즈 업로드
export const QuizUploadApi = (
  problemList: ProblemTypes[],
  userId: number,
  setTitle: string,
  description: string,
): Promise<AxiosResponse> => {
  return new Promise(async (resolve, reject) => {
    // 이미지 파일의 경우 이름만 전송하여 AWS S3 전송 링크를 받는다
    let problems = problemList.map((problem: any) => {
      const _tempProblem = { ...problem };
      if (problem.choiceType === 'img') {
        let _imgChoices = problem.choices.map((imgChoice: ChoiceImageTypes) => {
          return imgChoice.imgName;
        });
        _tempProblem.choices = _imgChoices;
      }
      if (problem.problemImage) {
        _tempProblem.problemImage = problem.problemImage.imgName;
      }
      return _tempProblem;
    });

    const res: AxiosResponse = await authAxios.post(`/probset`, { setTitle, problems, userId, description });
    
    const urlArray = res.data.urlArray;
    // problemList 에서 이미지 객체만 뽑아내기 
    let imageArray: ChoiceImageTypes[] = [];
    problemList.forEach((problem: ProblemTypes) => {
      if (problem.choiceType === 'img') {
        imageArray.push(...(problem.choices as ChoiceImageTypes[]));
      }
      if (problem.problemImage) {
        imageArray.push(problem.problemImage)
      }
    });
    // 이미지 객체를 S3 서버에 업로드하기
    imageArray.forEach(async (image) => {
      await putImageToS3URL(urlArray,image);
    })
    // 모든 작업이 끝난 후 res 값 반환하기
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
export const CommentSaveApi = async (nickname: string, content: string, probsetId: string, userId: string) => {
  return notAuthAxios.post(`/comment`, { nickname, content, probsetId, userId });
};
