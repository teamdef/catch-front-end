// Custom Axios에서 instance만든거 가져와서 사용
import { authAxios, notAuthAxios } from './customAxios';
import { AxiosResponse } from 'axios';

// 카카오톡 로그인
export const kakaoLoginApi = async (code: string): Promise<AxiosResponse> => {
  const res: AxiosResponse = await notAuthAxios.get(`/kakao/${code}`);
  return res;
};

// 카카오톡 회원탈퇴
export const kakaoLeaveApi = async (): Promise<AxiosResponse> => {
  const res: AxiosResponse = await authAxios.get('/kakaoLeave');
  return res;
};

// 프로필 정보 수정
interface ProfileChangeProps {
  id: string;
  imgBlob?: File;
  nickname?: string;
}
export const ProfileChangeApi = async ({ id, imgBlob, nickname }: ProfileChangeProps): Promise<AxiosResponse> => {
  return new Promise(async (resolve, reject) => {
    let _obj: any = {};
    _obj['userId'] = id;
    imgBlob && (_obj['profile_img'] = imgBlob.name);
    nickname && (_obj['nickname'] = nickname);
    const res: AxiosResponse = await authAxios.put('/user', _obj);
    if (imgBlob && res?.data?.uploadURL) {
      const res2: AxiosResponse = await notAuthAxios.put(res.data.uploadURL, imgBlob, {
        headers: { 'Content-Type': imgBlob.type },
      });
    }
    resolve(res);
  });
};
