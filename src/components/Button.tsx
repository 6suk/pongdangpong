import styled from 'styled-components';

import { ColorsTypes, FontSizeTypes } from '@/styles/theme';

type ButtonProps = {
  $themeColor: keyof ColorsTypes;
  size: keyof FontSizeTypes;
  children: React.ReactNode;
};

const Button = styled.button<ButtonProps>`
  background-color: ${({ theme, $themeColor }) => theme.colors[$themeColor]};
  color: white;
  font-size: ${({ theme, size }) => `${theme.fontSize[size]}px`};
  width: 160px;
  height: 50px;
`;
/* 필요한 스타일들 추가 */

export default Button;
