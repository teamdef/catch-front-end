// 이미지 로더. 이미지의 가로세로 크기를 구하기 위함 File Object to Image Object
import imageCompression from 'browser-image-compression';
import { ChangeEvent } from 'react';

export const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const _img = new Image();
    _img.src = url;
    _img.addEventListener('load', () => {
      resolve(_img);
    });
  });
}; // 이미지 최적화용
// 이미지 압축을 위한 옵션
const options = {
  maxSizeMB: 1, // 원본 이미지 최대 용량
  maxWidthOrHeight: 600, // 리사이즈 이미지 최대 width를 300px로 설정
  // useWebWorker: true, // 이미지 변환 작업 다중 스레드 사용 여부
  fileType: 'images/png', // 파일 타입
};

// 오늘 날짜 date객체 -> yyyy/mm/dd 함수
const dateString = (): string => {
  return new Date().toISOString().substring(0, 10).replace(/-/g, '/');
};

// 랜덤 문자열 생성 함수
const randomString = (len: number): string => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 중복의 여지가 있긴 함.
  for (let i = 0; i < len; i += 1) text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

// 이미지를 불러온 후 이미지 사이즈에 맞게 압축하는 과정
export const ReturnFileByImageSize = async (img: HTMLImageElement, file: File): Promise<ChoiceImageType> => {
  let _tempImgFile: File;
  // 이미지의 가로 또는 세로 길이가 300px 이하일 경우에는 압축하지 않음
  if (img.width < 300 || img.height < 300) {
    _tempImgFile = file;
  } else {
    // 이미지 압축 후 임시 이미지 파일 객체에 대입
    _tempImgFile = (await imageCompression(file, options)) as File;
  }
  const _imgFile = new File([_tempImgFile], `${dateString()}_${randomString(20)}.${_tempImgFile.type.split('/')[1]}`, {
    type: _tempImgFile.type,
  }); // 파일 객체 이름 변경

  // resize된 , 또는 압축되지 않은 이미지 파일의 썸네일 url을 생성함.
  const _imgURL = await imageCompression.getDataUrlFromFile(_imgFile);
  return { imgURL: _imgURL, imgName: _imgFile.name };
};
// File 객체를 ChoiceImageTypes 타입 객체로 변환하는 함수
export const FileListToImageObject = (_files: FileList) => {
  const _URL = window.URL || window.webkitURL;
  // FileList -> File Array
  const _fileArray = Array.from(_files);
  return _fileArray.map(async (file) => {
    const _imgElement = await loadImage(_URL.createObjectURL(file)); // 이미지 element 구하기
    const _thumbnail = await ReturnFileByImageSize(_imgElement, file); // 이미지 파일 url 저장
    return _thumbnail;
  });
};

export const getComperssedImg = async (e: ChangeEvent<HTMLInputElement> | string) => {
  let file = typeof e === 'string' ? e : e.target.files && (e.target.files[0] as File);
  try {
    // 이미지가 있을 경우
    if (file) {
      if (typeof file === 'string') file = await imageCompression.getFilefromDataUrl(file, '1234');
      const _compressed = (await imageCompression(file, options)) as File;
      const timestamp = new Date().toISOString().substring(0, 10);
      const _imgFile = new File([_compressed], `${timestamp}_${randomString(20)}.${_compressed.type.split('/')[1]}`, {
        type: _compressed.type,
      });
      const _imgURL = await imageCompression.getDataUrlFromFile(_compressed);
      return { _imgFile, _imgURL };
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};
