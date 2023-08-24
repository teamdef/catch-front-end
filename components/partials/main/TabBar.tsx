import styled from 'styled-components';
import { QuizSetCardType } from 'types/quiz';
import useSortList from 'hooks/useSortList';

interface TabData {
  name: string;
  value: number;
  checked: boolean;
}
interface TabBarProps {
  props: {
    quizSetList: QuizSetCardType[];
    listHandler: (_list: QuizSetCardType[]) => void;
  };
}
const TabDataList: TabData[] = [
  { name: '최신순', value: 1, checked: true },
  { name: '인기순', value: 2, checked: false },
  // { name: '댓글순', value: 3, checked: false },
];

const TabBar = ({ props }: TabBarProps) => {
  const { checked, tabHandler } = useSortList(props);

  return (
    <Wrapper>
      {TabDataList.map((tab, index) => (
        <ListTab key={index} checked={tab.value === checked} onClick={() => tabHandler(tab.value)}>
          {tab.name}
        </ListTab>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ListTab = styled.div<{ checked: boolean }>`
  flex-grow: 1;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  padding: 13px 0;
  border: none;
  border-bottom: 3px solid #efefef;
  cursor: pointer;
  ${({ checked }) => checked && 'border-color: #3b27ff;transition: 0.3s;color: #3b27ff;'}
`;
export default TabBar;
