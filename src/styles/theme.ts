import { DefaultTheme } from 'styled-components';

const colors = {
  'Pri-900': '#ebf1ff',
  'Pri-800': '#bfd1ff',
  'Pri-700': '#92b1ff',
  'Pri-600': '#6691ff',
  'Pri-500': '#4679fc',
  'Pri-400': '#2d62ea',
  'Pri-300': '#1546c2',
  'Pri-200': '#00247e',
  'Pri-100': '#0833a0',
  'Pri-50': '#001a5c',
  'Gray-900': '#fbfbfb',
  'Gray-800': '#f4f4f4',
  'Gray-700': '#e7e7e7',
  'Gray-600': '#cfcfcf',
  'Gray-500': '#aeaeae',
  'Gray-400': '#808080',
  'Gray-300': '#737373',
  'Gray-200': '#505050',
  'Gray-100': '#323232',
  'Gray-50': '#1d1d1d',
  Black: '#141212',
  White: '#ffffff',
  Error: '#df291d',
  Positive: '#1fb881',
};

const fontSize = {
  mainTitle: 28,
  title: 24,
  subTitle: 18,
  bodyText: 16,
  details: 14,
  smallestText: 12,
};

export type ColorsTypes = typeof colors;
export type FontSizeTypes = typeof fontSize;

export const theme: DefaultTheme = {
  colors,
  fontSize,
};

export default theme;
