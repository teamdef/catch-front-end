import Router from 'next/router';

export const moveMain = () => {
  const { quizset_id } = Router.query;
  Router.push(`/quiz/solve/${quizset_id}/main`);
};

export const moveResult = (_solver_id: string) => {
  const { quizset_id } = Router.query;
  Router.push(`/quiz/solve/${quizset_id}/result/${_solver_id}`);
};
