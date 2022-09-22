// Custom Axios에서 instance만든거 가져와서 사용
import axios from 'utils/customAxios';
import { AxiosResponse } from 'axios';

// 카카오톡 로그인
const kakaoLoginApi = async (code: string): Promise<AxiosResponse> => {
  const res: AxiosResponse = await axios.get(`/kakao/${code}`);
  return res;
};

//
const imageTestApi = (problems: ProblemTypes[], userId: number, setTitle: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const temp = problems.map((problem: ProblemTypes) => {
      if (problem.choiceType === 'img') {
        let _problem = JSON.parse(JSON.stringify(problem)); // 객체 깊은 복사
        let _choices: string[] = [];
        problem.choices.forEach((img) => {
          const tem = img as unknown as File;
          _choices.push(tem.name);
        });
        _problem.choices = _choices;
        return _problem;
      } else {
        return problem;
      }
    });

    const res: AxiosResponse = await axios.post(`/rds`, { setTitle, problems: temp, userId });

    const returnArray = res.data.returnArray;
    const returnSetId = res.data.returnSetId;

    let imageArray: File[] = [];
    problems.forEach((problem: ProblemTypes) => {
      if (problem.choiceType === 'img') {
        const ttt = problem.choices as unknown as File;
        imageArray.push(ttt);
      }
    });

    const flatArr = imageArray.flat();

    flatArr.forEach(async (imgBlob) => {
      const aaa = returnArray.find((value: any) => value.fileName === imgBlob.name);
      const res2: AxiosResponse = await axios.put(aaa.putUrl, imgBlob, {
        headers: { 'Content-Type': imgBlob.type },
      });
    });
    resolve(returnSetId);
  })
  
  
  
};
export { kakaoLoginApi, imageTestApi };
