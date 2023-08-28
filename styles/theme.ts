import { DefaultTheme } from 'styled-components';
import mixin from './mixin';

const fontSize = {
  /** 44px */
  header_1: '44px',
  /** 36px */
  header_2: '36px',
  /** 32px */
  header_3: '32px',
  /** 28px */
  header_4: '28px',
  /** 24px */
  header_5: '24px',
  /** 20px */
  subtitle_1: '20px',
  /** 18px */
  subtitle_2: '18px',
  /** 16px */
  body_1: '16px',
  /** 14px */
  body_2: '14px',
  /** 12px */
  caption: '12px',
};

const colors = {
  /** #D9FFF0 */
  primary_bg: '#D9FFF0',
  /** #EEE6FF */
  primary_50: '#EEE6FF',
  /** #27FFBE */
  primary_200: '#27FFBE',
  /** #00EC81 */
  primary_500: '#00EC81',
  /** #00C565 */
  primary_700: '#00C565',
  /** #B099FE */
  secondary_200: '#B099FE',
  /** #8C6EFF */
  secondary_300: '#8C6EFF',
  /** #3B27FF */
  secondary_500: '#3B27FF',
  /** #001BF0 */
  secondary_700: '#001BF0',
  /** #FF6897 */
  complementary_1: '#FF6897',
  /** #FF2768 */
  complementary_2: '#FF2768',
  /** #FF2768 */
  error_1: '#FF2768',
  /** #FFD2E0 */
  error_2: '#FFD2E0',
  blackColors: {
    /** #212121 */
    grey_900: '#212121',
    /** #424242 */
    grey_800: '#424242',
    /** #616161 */
    grey_700: '#616161',
    /** #757575 */
    grey_600: '#757575',
    /** #9e9e9e */
    grey_500: '#9e9e9e',
    /** #bdbdbd */
    grey_400: '#bdbdbd',
    /** #e0e0e0 */
    grey_300: '#e0e0e0',
    /** #eeeeee */
    grey_200: '#eeeeee',
    /** #f5f5f5 */
    grey_100: '#f5f5f5',
    /** #fafafa */
    grey_50: '#fafafa',
  },
};

const fontWeight = {
  /** 100 */
  thin: 100,
  /** 200 */
  extra_light: 200,
  /** 300 */
  light: 300,
  /** 400 */
  regular: 400,
  /** 500 */
  medium: 500,
  /** 600 */
  semibold: 600,
  /** 700 */
  bold: 700,
  /** 800 */
  extra_bold: 800,
  /** 900 */
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
