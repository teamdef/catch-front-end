import { useState } from 'react';
import { QuizSetCardType } from 'types/quiz';

interface useSortListProps {
  quizSetList: QuizSetCardType[];
  listHandler: (_list: QuizSetCardType[]) => void;
}
const useSortList = ({ quizSetList, listHandler }: useSortListProps) => {
  const [checked, setChecked] = useState(1);
  const current_list: QuizSetCardType[] = [...quizSetList];
  const tabHandler = (_value: number) => {
    if (_value !== checked) {
      setChecked(_value);
      sortList(_value);
    }
  };
  const sortList = (_value: number) => {
    switch (_value) {
      case 1: {
        const sortLatest = current_list.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
        listHandler(sortLatest);
        break;
      }
      case 2: {
        const sortPopular = current_list.sort((a, b) => b.solverCnt - a.solverCnt);
        listHandler(sortPopular);
        break;
      }
      // 추후 dto 수정 후 댓글 순 추가 예정
      // case 3: {
      //   break;
      // }
      default:
        break;
    }
  };
  return { checked, tabHandler };
};

export default useSortList;
