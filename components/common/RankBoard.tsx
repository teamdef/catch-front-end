import { useEffect, useState } from 'react';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import axios from 'axios';

interface NewUserType {
  created_at: string;
  id: string;
  nickname: string;
  ranking: string;
  score: number;
}
const RankBoard = ({ solveId }:any) => {
  const { quizId } = useSelector((state: RootState) => state.solve);
  const [rankList, setRankList] = useState<string[]>([]);
  const [newUser, setNewUser] = useState<NewUserType>();

  useEffect(() => {
    async function getRank() {
      try {
        const rank_res = await axios.get(`https://api.catchcatch.link/v1/solver/ranking?probsetId=${quizId}`);
        console.log(rank_res);
        setRankList(rank_res.data);
      } catch (error) {
        console.error(error);
      }
    }
    async function getUser() {
      try {
        const user_res = await axios.get(
          `https://api.catchcatch.link/v1/solver/ranking?probsetId=${quizId}&solverId=${solveId}`,
        );
        console.log(user_res);
        setNewUser(user_res.data[0]);
      } catch (error) {
        console.error(error);
      }
    }
    getRank();
    getUser();
  }, []);

  const Ranking = rankList.map(
    (item: any, index: number) =>
      newUser && (
        <li className={`rank_${index + 1} ${index < 3 ? 'ranked': ''} ${item.nickname == newUser.nickname ? 'active' : ''}`} key={index}>
          <div>
            <i>{index + 1 == 1 ? '🥇' : index + 1 == 2 ? '🥈' : index + 1 == 3 ? '🥉' : index + 1}</i>
            <strong>{item.nickname}</strong>
            <em>{item.score}점</em>
          </div>
        </li>
      ),
  );
  return (
    <>
      {newUser && Number(newUser.ranking) > 5 ? (
        <ul>
          {Ranking.slice(0, 5)}
          <li className={`rank_${Number(newUser.ranking)} active`}>
            <div>
              <i>{Number(newUser.ranking)}</i>
              <strong>{newUser.nickname}</strong>
              <em>{newUser.score}점</em>
            </div>
          </li>
        </ul>
      ) : (
        <ul>{Ranking.slice(0, 6)}</ul>
      )}
    </>
  );
};

export default RankBoard;
