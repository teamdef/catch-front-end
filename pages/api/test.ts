// Custom Axios에서 instance만든거 가져와서 사용
import { authAxios, notAuthAxios } from 'utils/customAxios';
import { AxiosResponse } from 'axios';

// 카카오톡 로그인
const kakaoLoginApi = async (code: string): Promise<AxiosResponse> => {
  const res: AxiosResponse = await authAxios.get(`/kakao/${code}`);
  return res;
};

const kakaoLeaveApi = async (): Promise<AxiosResponse> => {
  const res: AxiosResponse = await authAxios.get('/kakaoLeave');
  return res;
};
//
const imageTestApi = (problems: ProblemTypes[], userId: number, setTitle: string): Promise<AxiosResponse> => {
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

    const res: AxiosResponse = await authAxios.post(`/probset`, { setTitle, problems: temp, userId });

    const urlArray = res.data.urlArray;
    const returnSetId = res.data.returnSetId;
    const returnThumb = res.data.returnThumb;

    let imageArray: File[] = [];
    problems.forEach((problem: ProblemTypes) => {
      if (problem.choiceType === 'img') {
        const ttt = problem.choices as unknown as File;
        imageArray.push(ttt);
      }
    });

    const flatArr = imageArray.flat();
    if (flatArr.length !== 0) {
      flatArr.forEach(async (imgBlob) => {
        const aaa = urlArray.find((value: any) => value.fileName === imgBlob.name);

        const res2: AxiosResponse = await notAuthAxios.put(aaa.putUrl, imgBlob, {
          headers: { 'Content-Type': imgBlob.type },
        });
      });
    }
    resolve(res);
  });
};

const ThumbnailChangeApi = async (probsetId: string, imgBlob: File): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    const res: AxiosResponse = await authAxios.post('/thumbnail', { probsetId, thumbnail: imgBlob.name });
    const res2: AxiosResponse = await notAuthAxios.put(res.data, imgBlob, {
      headers: { 'Content-Type': imgBlob.type },
    });
    resolve(res2.status);
  });
};

const RecentQuizListApi = ():Promise<AxiosResponse> => { 
  return notAuthAxios.get('https://8anald9349.execute-api.ap-northeast-2.amazonaws.com/Stage/recentprobset');

}
export { kakaoLoginApi, imageTestApi, kakaoLeaveApi, ThumbnailChangeApi, RecentQuizListApi };
