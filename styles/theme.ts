import { DefaultTheme } from 'styled-components';
import mixin from './mixin';

const fontSize = {
  header_1: '44px',
  header_2: '36px',
  header_3: '32px',
  header_4: '28px',
  header_5: '24px',
  subtitle_1: '20px',
  subtitle_2: '18px',
  body_1: '16px',
  body_2: '14px',
  caption: '12px',
};

const colors = {
  primary_50: '#EEE6FF' /** *#EEE6FF */,
  primary_200: '#27FFBE',
  primary_500: '#00EC81',
  primary_700: '#00C565',
  secondary_200: '#B099FE',
  secondary_300: '#8C6EFF',
  secondary_500: '#3B27FF',
  secondary_700: '#001BF0',
  complementary_1: '#FF6897',
  complementary_2: '#FF2768',
  mintColor: '#D9FFF0',
  blackColors: {
    grey_900: '#212121' /** * #212121 */,
    grey_800: '#424242',
    grey_700: '#616161',
    grey_600: '#757575',
    grey_500: '#9e9e9e',
    grey_400: '#bdbdbd',
    grey_300: '#e0e0e0',
    grey_200: '#eeeeee',
    grey_100: '#f5f5f5',
    grey_50: '#fafafa',
  },
};

const fontWeight = {
  thin: 100,
  extra_light: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extra_bold: 800,
  black: 900,
};

export type ColorsType = typeof colors;
export type FontSizeType = typeof fontSize;
export type FontWeightType = typeof fontWeight;
export type MixinType = typeof mixin;

/* 타입스크립트에서 DefaultTheme를 사용하려면 interface를 선언해주어야 한다. 아니면 theme가 any타입으로 나오게 된다. */
declare module 'styled-components' {
  export interface DefaultTheme {
    // 여기에 적용하고 싶은 속성과 타입을 정의한다
    colors: ColorsType;
    fontSize: FontSizeType;
    fontWeight: FontWeightType;
    mixin: MixinType;
  }
}

export const theme: DefaultTheme = {
  colors,
  fontSize,
  fontWeight,
  mixin,
};
