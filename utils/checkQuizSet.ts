/* 문제 저장 조건 체크 함수 2 */
const checkQuizSet = (quizList: (TextQuiz | ImageQuiz)[]): boolean => {
  if (!quizList[0]) return false;
  quizList.forEach((quiz: TextQuiz | ImageQuiz) => {
    if (quiz.quizTitle === '') return false;
    if (quiz.choices.length < 2) return false;
    return true;
  });
  return true;
};
export default checkQuizSet;
