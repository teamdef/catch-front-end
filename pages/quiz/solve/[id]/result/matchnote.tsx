import { AppLayout, HeaderLayout } from 'components/layout';
import type { NextPageWithLayout } from 'pages/_app';
import type { ReactElement } from 'react';
import * as S from 'styles/quiz/solve/main.style';
import * as Match from 'styles/quiz/solve/matchnote.style';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { MainButton } from 'styles/common';
import { useRouter } from 'next/router';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { answerList, quizList, quizSetId } = useSelector((state: RootState) => state.solve);
  return (
    <S.Container>
      <Match.MatchTitle>
        <span>오답노트</span>
      </Match.MatchTitle>
      {quizList.map((item: SolveQuizType, i: number) => {
        return (
          <Match.QuizMatchCard key={i} className={answerList[i] != 'catch' ? 'wrong' : ''}>
            <S.CardNumber>{i + 1}</S.CardNumber>
            <S.QuizTitle>{item.quizTitle}</S.QuizTitle>
            {item.quizThumbnail && (
              <S.QuizImageWrapper>
                <img alt="퀴즈 설명 이미지" src={item.quizThumbnail} />
              </S.QuizImageWrapper>
            )}
            {item.choiceType==='img' ? (
              <S.ChoiceWrapper id="choice-img-wrapper">
                {item.choices.map((choice: any, j: number) => (
                  <Match.MatchChoiceItem
                    key={j}
                    className={`choice-img-item ${item.correctIndex === j ? 'correct' : ''}`}
                    id={j === answerList[i] ? 'my-answer' : ''}
                  >
                    <img src={choice} />
                  </Match.MatchChoiceItem>
                ))}
              </S.ChoiceWrapper>
            ) : (
              <S.ChoiceWrapper>
                {item.choices.map((choice: string, j: number) => (
                  <Match.MatchChoiceItem
                    key={j}
                    className={`choice-txt-item ${item.correctIndex === j ? 'correct' : ''}`}
                    id={j == answerList[i] ? 'my-answer' : ''}
                  >
                    <span>{choice}</span>
                    {item.correctIndex === j ? (
                      <span style={{ color: '#fff', fontFamily: 'RixInooAriDuriR', fontSize: '2rem' }}>O</span>
                    ) : (
                      ''
                    )}
                    {j == answerList[i] ? (
                      <span style={{ color: '#fff', fontFamily: 'RixInooAriDuriR', fontSize: '2rem' }}>X</span>
                    ) : (
                      ''
                    )}
                  </Match.MatchChoiceItem>
                ))}
              </S.ChoiceWrapper>
            )}
          </Match.QuizMatchCard>
        );
      })}
      <Match.MatchBottom>
        <MainButton style={{ height: '40px' }} onClick={() => router.push(`/quiz/solve/${quizSetId}`)}>
          다시 풀기
        </MainButton>
      </Match.MatchBottom>
    </S.Container>
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
