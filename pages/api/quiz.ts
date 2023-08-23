/* eslint-disable no-async-promise-executor */
import { AxiosResponse } from 'axios';
import imageCompression from 'browser-image-compression'; // 이미지 최적화용
import { authAxios, notAuthAxios } from './customAxios';

// 최근 생성된 퀴즈 목록

export const RecentQuizListApi = (pagination_key?: any): Promise<AxiosResponse> => {
  if (pagination_key) return notAuthAxios.get('/recentprobset', { params: { pagination_key } });
  return notAuthAxios.get('/recentprobset');
};

// 특정 퀴즈 id의 퀴즈 자세히 보기
export const MyQuizDetailApi = (quizset_id: string): Promise<AxiosResponse> => {
  return authAxios.get(`/probset/detail/${quizset_id}`);
};

// 내가 만든 퀴즈 목록
export const UserQuizListApi = (user_id: string): Promise<AxiosResponse> => {
  return authAxios.get(`/userprobset/${user_id}`);
};

// 특정 퀴즈 id의 퀴즈 삭제
export const QuizDeleteApi = (quizset_id: string): Promise<AxiosResponse> => {
  return authAxios.delete(`/probset/${quizset_id}`);
};

/**
 * @param quizset_id
 * 특정 퀴즈 id의 랭킹 조회 */
export const QuizRankingListApi = async (quizset_id: string) => {
  const res: AxiosResponse = await notAuthAxios.get(`/solver/ranking`, { params: { quizset_id } });
  const parseRankingList: RankingType[] = res.data.map((ranking: RankingDtoType) => {
    const _ranking: RankingType = {
      id: ranking.id,
      nickname: ranking.nickname,
      score: ranking.score,
      ranking: ranking.ranking,
      quizCount: ranking.quiz_count,
    };
    return _ranking;
  });
  return parseRankingList;
};

// 풀이 결과 불러오기
export const QuizSolverResultApi = (quizset_id: string, solver_id: string): Promise<AxiosResponse> => {
  return notAuthAxios.get(`/solver`, { params: { quizset_id, solver_id } });
};

// imageObject 를 Blob으로 변환하여 S3에 전송하는 함수
const putImageToS3URL = async (urlArray: any, _imageObject: ChoiceImageType) => {
  const _foundUrl = urlArray.find((value: any) => value.filename === _imageObject.imgName);
  const _imageFile = (await imageCompression.getFilefromDataUrl(
    _imageObject.imgURL,
    _imageObject.imgName,
  )) as unknown as File;
  const res = notAuthAxios.put(_foundUrl.put_url, _imageFile, {
    headers: { 'Content-Type': _imageFile.type },
  });
  return res;
};
// 생성 - 새로 만든 퀴즈 업로드
export const QuizUploadApi = (
  quizList: (TextQuiz | ImageQuiz)[],
  userId: number,
  setTitle: string,
  description: string,
): Promise<AxiosResponse> => {
  return new Promise(async (resolve) => {
    // 이미지 파일의 경우 이름만 전송하여 AWS S3 전송 링크를 받는다
    const _quizList = quizList.map((quiz: TextQuiz | ImageQuiz) => {
      const _tempQuiz: any = {};
      _tempQuiz.quiz_title = quiz.quizTitle;
      _tempQuiz.correct_idx = quiz.correctIndex;
      _tempQuiz.choice_type = quiz.choiceType;
      if (quiz.choiceType === 'img') {
        const _imgChoices = quiz.choices.map((imgChoice: ChoiceImageType) => {
          return imgChoice.imgName;
        });
        _tempQuiz.choices = _imgChoices;
      } else {
        _tempQuiz.choices = quiz.choices;
      }
      if (quiz.quizThumbnail) {
        _tempQuiz.quiz_thumbnail = quiz.quizThumbnail.imgName;
      }
      return _tempQuiz;
    });

    const res: AxiosResponse = await authAxios.post(`/probset`, {
      set_title: setTitle,
      quiz_list: _quizList,
      user_id: userId,
      description,
    });

    const urlArray = res.data.url_array;
    // problemList 에서 이미지 객체만 뽑아내기
    const imageArray: ChoiceImageType[] = [];
    quizList.forEach((quiz: TextQuiz | ImageQuiz) => {
      if (quiz.choiceType === 'img') {
        imageArray.push(...(quiz.choices as ChoiceImageType[]));
      }
      if (quiz.quizThumbnail) {
        imageArray.push(quiz.quizThumbnail);
      }
    });
    // 이미지 객체를 S3 서버에 업로드하기
    imageArray.forEach(async (image) => {
      await putImageToS3URL(urlArray, image);
    });
    // 모든 작업이 끝난 후 res 값 반환하기
    resolve(res);
  });
};

// 특정 id의 퀴즈 썸네일 변경
export const QuizThumbnailChangeApi = async (quizset_id: string, imgBlob: File): Promise<number> => {
  return new Promise(async (resolve) => {
    const res: AxiosResponse = await authAxios.post('/thumbnail', { quizset_id, thumbnail: imgBlob.name });
    const res2: AxiosResponse = await notAuthAxios.put(res.data, imgBlob, {
      headers: { 'Content-Type': imgBlob.type },
    });
    resolve(res2.status);
  });
};

// 풀이 - 특정 id의 퀴즈 정보 불러오기
export const QuizDataFetchApi = async (quizset_id: string): Promise<AxiosResponse> => {
  return notAuthAxios.get(`/loadprobset/${quizset_id}`);
};

/* snake case 로 변경하기 */
// 풀이 - 퀴즈 풀이 정보 저장하기 (로그인)
export const LoginUserQuizSolveSaveApi = async (
  nickname: string,
  score: number,
  quizset_id: string,
  user_id: string,
) => {
  return notAuthAxios.post(`/solver`, { nickname, score, quizset_id, user_id });
};
// (비로그인)
export const NotLoginUserQuizSolveSaveApi = async (nickname: string, score: number, quizset_id: string) => {
  return notAuthAxios.post(`/solver`, { nickname, score, quizset_id });
};

export const SaveScoreApi = async (
  nickname: string,
  score: number,
  quizset_id: string,
  user_id: string,
  quiz_count: number,
) => {
  return notAuthAxios.post(`/solver`, { nickname, score, quizset_id, user_id, quiz_count });
};

// 한줄평 - 목록 불러오기
export const CommentListApi = async (quizset_id: string) => {
  const res: AxiosResponse = await notAuthAxios.get(`/comment/${quizset_id}`);
  const _commentList = res.data.map((comment: CommentType) => {
    const _comment: CommentType = {
      nickname: comment.nickname,
      content: comment.content,
      created_at: comment.created_at,
      user: comment.user && { nickname: comment.user.nickname, profile_img: comment.user.profile_img },
    };
    return _comment;
  });

  return _commentList;
};

// 한줄평 - 등록하기
export const CommentSaveApi = async (nickname: string, content: string, quizset_id: string, user_id: string | null) => {
  const res: AxiosResponse = await notAuthAxios.post(`/comment`, { nickname, content, quizset_id, user_id });
  const _commentList: CommentType[] = res.data.map((comment: CommentType) => {
    const _comment: CommentType = {
      nickname: comment.nickname,
      content: comment.content,
      created_at: comment.created_at,
      user: comment.user && { nickname: comment.user.nickname, profile_img: comment.user.profile_img },
    };
    return _comment;
  });

  return _commentList;
};

// 감정표현
export const EmotionClickApi = async (emotion: EmotionType | 'NONE', quizset_id: string, solver_id: string) => {
  return notAuthAxios.put(`/solver/emotion`, { emotion, quizset_id, solver_id });
};
/** 퀴즈세트썸네일 변경 API */
export const changeQuizThumbnail = async (imgFileObj: imgFileObj, quizSetId: string) => {
  try {
    await QuizThumbnailChangeApi(quizSetId as string, imgFileObj._imgFile);
    return imgFileObj._imgURL;
  } catch (err) {
    console.log('changeQuizThumbnail : ', err);
  }
  return null;
};
