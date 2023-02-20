import { AppLayout, HeaderLayout } from 'components/layout';
import type { NextPageWithLayout } from 'pages/_app';
import type { ReactElement } from 'react';
import * as S from 'styles/quiz/solve/matchnote.style';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { MainButton } from 'styles/common';
import { useRouter } from 'next/router';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { solveAnswers, solveProblems, problemSetId } = useSelector((state: RootState) => state.solve);
  return (
    <S.MatchEl>
      <h1>오답노트</h1>
      {solveProblems.map((item: SolveProblemTypes, i: number) => {
        return (
          <S.QuizSolveCard key={i} className={solveAnswers[i] != 'catch' ? 'wrong' : ''}>
            <S.CardNumber>{i + 1}</S.CardNumber>
            <S.CardTitle>{item.prob_title}</S.CardTitle>
            {/* <CardTitleImg></CardTitleImg> */}
            {item.is_img ? (
              <S.ChoiceWrapper id="choice-img-wrapper">
                {item.choices.map((_choice: any, j: number) => (
                  <S.ChoiceItem
                    key={j}
                    className={`choice-img-item ${item.correct_choice == _choice.id ? 'correct' : ''}`}
                    id={_choice.id == solveAnswers[i] ? 'my-answer' : ''}
                  >
                    <img src={_choice.cho_img} />
                  </S.ChoiceItem>
                ))}
              </S.ChoiceWrapper>
            ) : (
              <S.ChoiceWrapper>
                {item.choices.map((_choice: SolveChoicesTypes, j: number) => (
                  <S.ChoiceItem
                    key={j}
                    className={`choice-txt-item ${item.correct_choice == _choice.id ? 'correct' : ''}`}
                    id={_choice.id == solveAnswers[i] ? 'my-answer' : ''}
                  >
                    <span>{_choice.cho_txt}</span>
                    {item.correct_choice == _choice.id ? (
                      <span style={{ color: '#fff', fontFamily: 'RixInooAriDuriR', fontSize: '2rem' }}>O</span>
                    ) : (
                      ''
                    )}
                    {_choice.id == solveAnswers[i] ? (
                      <span style={{ color: '#fff', fontFamily: 'RixInooAriDuriR', fontSize: '2rem' }}>X</span>
                    ) : (
                      ''
                    )}
                  </S.ChoiceItem>
                ))}
              </S.ChoiceWrapper>
            )}
          </S.QuizSolveCard>
        );
      })}
      <S.MatchBottom>
        <MainButton style={{ height: '40px' }} onClick={() => router.push(`/quiz/solve/${problemSetId}`)}>
          다시 풀기
        </MainButton>
      </S.MatchBottom>
    </S.MatchEl>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};
export default Page;
