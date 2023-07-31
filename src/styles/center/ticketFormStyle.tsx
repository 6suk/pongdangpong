import { styled } from 'styled-components';

import theme from '@styles/theme';

export const FormToggleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  justify-content: flex-end;

  & > p {
    font-size: ${theme.font.sub};
    color: ${theme.colors.gray[500]};
  }

  .toggle-box {
    position: relative;
    cursor: pointer;

    & > .toggle-container {
      width: 42px;
      height: 24px;
      border-radius: 30px;
      background-color: ${theme.colors.gray[800]};
    }
    & > .toggle--checked {
      background-color: ${theme.colors.pri[600]};
      transition: 0.5s;
    }

    & > .toggle-circle {
      position: absolute;
      top: 4px;
      left: 4px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: rgb(255, 254, 255);
      transition: 0.5s;
    }
    & > .toggle--checked {
      left: 22px;
      transition: 0.5s;
    }
  }
`;

export const LabelNotice = styled.span`
  font-size: ${theme.font.sm};
  color: ${theme.colors.gray[500]};
  margin-left: 0.5rem;
  font-weight: 300;
`;

export const InputCountStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 9fr 1fr;
  align-items: center;
  gap: 0.5rem;

  button {
    font-size: 24px;
    color: ${theme.colors.gray[200]};
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.gray[800]};
    border-radius: 50%;
    box-sizing: border-box;
    padding: 0;
    aspect-ratio: 1 / 1;
    height: 38px;
    transition: all 0.4s;

    &:hover {
      background-color: ${theme.colors.gray[700]};
    }
  }

  .unit {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
  }
`;

export const FormGridContainer = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  grid-auto-flow: column;
  row-gap: 0.5rem;
  column-gap: 3rem;

  .row-input {
    display: flex;
    gap: 0.5rem;

    :first-child {
      flex: 7;
    }
    :last-child {
      flex: 3;
    }
  }
`;

export const FormButtonGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 3rem;
`;
