// Custom Axios에서 instance만든거 가져와서 사용
import axios from 'utils/customAxios';
import { AxiosResponse } from "axios"

// 카카오톡 로그인
const kakaoLoginApi = async (code: string): Promise<any> => {
  const res: AxiosResponse = await axios.get('/kakao', { params: { code } });
  return res;
};

export { kakaoLoginApi };
