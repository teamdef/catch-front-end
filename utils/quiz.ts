import { QuizSetCardType } from 'types/quiz';

export const parseDetailQuiz = (data: any) => {
  const _detailQuiz: DetailQuizType = {
    solverCnt: data.solver_cnt,
    createdAt: data.created_at.substring(0, 10),
    updatedAt: data.updated_at.substring(0, 10),
    quizSetId: data.id,
    setTitle: data.set_title,
    average: data.average.toFixed(2),
    description: data.description,
    quizSetThumbnail: data.thumbnail ?? null,
  };
  return _detailQuiz;
};
export const parseSolveQuizSet = (data: any) => {
  const solveQuizSet: SolveQuizSetType = {
    quizSetId: data.id,
    setTitle: data.set_title,
    quizSetThumbnail: data.thumbnail,
    description: data.description,
    quizMaker: data.user,
    solverCnt: data.solver_cnt,
    quizList: data.quiz.map((q: SolveQuizType) => {
      return {
        quiz_thumbnail: q.quiz_thumbnail ?? null,
        quiz_title: q.quiz_title,
        choice_type: q.choice_type,
        choices: q.choices,
        correct_idx: q.correct_idx,
      };
    }),
  };
  return solveQuizSet;
};
export const parseBestCommentList = (data: any) => {
  const _bestCommentList = data.map((comment: CommentType) => {
    const _comment: CommentType = {
      nickname: comment.nickname,
      content: comment.content,
      created_at: comment.created_at,
      user: comment.user && { nickname: comment.user.nickname, profile_img: comment.user.profile_img },
    };
    return _comment;
  });
  return _bestCommentList;
};

export const parseBestRankingList = (data: RankingDtoType[]) => {
  const _bestRankingList = data.map((ranking: RankingDtoType) => {
    const _ranking: RankingType = {
      id: ranking.id,
      nickname: ranking.nickname,
      score: ranking.score,
      ranking: ranking.ranking,
      quizCount: ranking.quiz_count,
    };
    return _ranking;
  });
  return _bestRankingList;
};

export const parseQuizSetList = (data: any) => {
  const allQuizMap = data.map((quizSet: any) => {
    const quizObj: QuizSetCardType = {
      quizSetId: quizSet.id,
      createdAt: quizSet.created_at,
      quizSetTitle: quizSet.set_title,
      solverCnt: quizSet.solver_cnt,
      quizSetThumbnail: quizSet.thumbnail ?? null,
      quizSetMaker: { nickname: quizSet.user.nickname, profile_img: quizSet.user.profile_img },
    };
    return quizObj;
  });
  return allQuizMap;
};
