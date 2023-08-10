import { styled } from 'styled-components';

import theme from '../theme';

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  font-size: ${theme.font.sub};
  margin-top: 2rem;

  &.modal {
    display: flex;
    justify-content: center;
    font-size: 0.875rem;
    margin-top: 2rem;
    position: absolute;
    bottom: 1.5rem;
    left: 0;
    right: 0;
  }

  & > button[type='button'].pageBtn {
    width: 33px;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: 1px solid ${theme.colors.inputBorder};
    color: ${theme.colors.gray[600]};
    &.on {
      background-color: ${theme.colors.pri[900]};
      color: ${theme.colors.pri[500]};
    }

    &:first-child {
      border-radius: 6px 0px 0px 6px;
    }
    &:last-child {
      border-radius: 0px 6px 6px 0px;
    }
    &:not(:last-child) {
      border-right: 0;
    }

    svg {
      width: 8px;
      fill: ${theme.colors.gray[600]};
    }

    &.prev {
      svg {
        transform: rotate(180deg);
      }
    }
  }
`;
