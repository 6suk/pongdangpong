import { styled } from 'styled-components';

import theme from '@styles/theme';

export const ErrorMessage = styled.p`
  margin-top: 0.5rem;
  font-size: ${theme.font.sm} !important;
  color: ${theme.colors.Error} !important;
  margin-bottom: 0;
`;
