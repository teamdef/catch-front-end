/* eslint-disable no-async-promise-executor */
// Custom Axios에서 instance만든거 가져와서 사용
import { AxiosResponse } from 'axios';
import { authAxios, notAuthAxios } from './customAxios';

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
export interface ProfileChangeProps {
  userId: string;
  imgBlob?: File;
  nickname?: string;
}

export const ProfileChangeApi = async ({ userId, imgBlob, nickname }: ProfileChangeProps): Promise<AxiosResponse> => {
  return new Promise(async (resolve) => {
    const _obj = { userId, profile_img: imgBlob?.name, nickname };
    const res: AxiosResponse = await authAxios.put('/user', _obj);
    if (imgBlob && res?.data?.uploadURL) {
      await notAuthAxios.put(res.data.uploadURL, imgBlob, {
        headers: { 'Content-Type': imgBlob.type },
      });
    }
    resolve(res);
  });
};
