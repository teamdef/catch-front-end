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
