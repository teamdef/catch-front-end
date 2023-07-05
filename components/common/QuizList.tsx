import { RootState } from 'store';
import { useSelector } from 'react-redux';
import QuizItem from './QuizItem';


const QuizList = () => {
  const { quizList } = useSelector((state: RootState) => state.solve);

  return quizList.map((item: SolveQuizType, quiz_num: number) => (
    <QuizItem item={item} quiz_num={quiz_num}/>
    
  ));
};
export default QuizList;
