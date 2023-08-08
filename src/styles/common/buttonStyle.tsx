import { styled } from 'styled-components';

import theme from '../theme';

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    width: 6px;
    fill: ${theme.colors.gray[500]};
  }

  font-size: ${theme.font.sub};
  color: ${theme.colors.gray[500]};
`;

export const DetailButton = styled.button`
  font-size: 14px;
  padding-inline: 0.2rem;
  padding-block: 0.3rem;
  background-color: ${theme.colors.gray[800]};
  color: ${theme.colors.gray[400]};
  border-radius: 6px;
  transition: all 0.4s;

  &.pri {
    background-color: ${theme.colors.pri[900]};
    color: ${theme.colors.pri[500]};

    &:hover {
      font-weight: 600;
      background-color: ${theme.colors.pri[800]};
    }
  }

  &:hover {
    font-weight: 600;
    background-color: ${theme.colors.gray[700]};
  }
`;

type CommonButtonProps = {
  $isPri?: boolean;
  $size: string;
};

export const CommonButton = styled.button<CommonButtonProps>`
  ${({ $size, $isPri = true, theme }) => {
    const { colors, font } = theme;
    return `
      ${$size}
      background-color: ${$isPri ? colors.pri[500] : colors.gray[800]};
      &:hover {
        background-color: ${$isPri ? colors.pri[400] : colors.gray[700]};
      }
      color: ${$isPri ? colors.White : colors.gray[50]};
      border-radius: 0.375rem;
      transition: background-color 0.2s ease-in-out;
      outline: none;
      &:focus {
        ring: 2px;
        ring-offset: 2px;
        ring-color: ${$isPri ? colors.pri[800] : colors.gray[800]};
      }
      font-size: ${font.sub};

      &:disabled {
        background-color: ${colors.gray[800]};
        color : ${colors.gray[500]}
      }
    `;
  }}
`;
