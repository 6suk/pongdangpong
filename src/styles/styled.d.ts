import 'styled-components';
import { ColorsTypes, FontSizeTypes } from '@theme';

declare module 'style-components' {
  export interface DefaultTheme {
    colors: ColorsTypes;
    fontSize: FontSizeTypes;
  }
}
