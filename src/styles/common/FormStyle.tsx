import { styled } from 'styled-components';

import Profile from '@/assets/icons/common/Profile.svg';
import theme from '@styles/theme';

export const FormGridContainer = styled.div`
  margin-top: 2rem;
  display: grid;
  /* grid-template-rows: repeat(4, minmax(100px, 1fr)); */
  grid-template-rows: repeat(4, minmax(100px, 100px));
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

  &.rows-three {
    grid-template-rows: repeat(3, minmax(100px, 100px));
  }
`;

export const FormButtonGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 3rem;
`;

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

  &::after {
    display: none;
  }
`;

export const Chips = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
  }

  label {
    padding-inline: 1.6rem;
    padding-block: 0.5rem;
    border-radius: 6px;
    font-size: ${theme.font.sub};
    border: 1px solid ${theme.colors.inputBorder};

    &.error {
      border: 1px solid ${theme.colors.Error};
    }

    &.on {
      color: ${theme.colors.White};
      border: 1px solid ${theme.colors.pri[500]};
      background-color: ${theme.colors.pri[600]};
    }
  }

  input[type='radio'] {
    display: none;
  }
`;

export const SelectButton = styled.button`
  font-size: 14px;
  padding: 8px 16px;
  background-color: ${theme.colors.White};
  color: ${theme.colors.pri[500]};
  border: 1px solid ${theme.colors.pri[500]};
  border-radius: 8px;
  transition: background-color 0.2s ease-in-out;
  outline: none;
  cursor: pointer;

  &.error {
    border: 1px solid rgba(${theme.colors.ErrorRGB}, 0.7);
    transition: all 0.3s;
  }

  &:hover {
    background-color: ${theme.colors.pri[900]};
    color: ${theme.colors.pri[400]};
  }

  &:disabled {
    background-color: ${theme.colors.gray[800]};
    cursor: not-allowed;
    color: ${theme.colors.gray[500]};
    border: 1px solid ${theme.colors.gray[500]};
  }
`;

export const NameButton = styled.button`
  font-size: 14px;
  background-color: ${({ theme }) => theme.colors.White};
  border: 1px solid ${({ theme }) => theme.colors.gray[600]};
  border-radius: 8px;
  padding: 1px 2px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &.info-btn {
    cursor: default;
    padding-right: 12px;
    border: 1px solid ${({ theme }) => theme.colors.gray[600]};
  }

  .user-name {
    color: ${({ theme }) => theme.colors.gray[300]};
    display: flex;
    align-items: center;
  }

  .user-name::before {
    content: url(${Profile});
    margin-right: 8px;
    margin-top: 5px;
    margin-left: 8px;
  }

  .close-button {
    color: ${({ theme }) => theme.colors.gray[500]};
    margin-left: 8px;
    margin-right: 8px;
    cursor: pointer;
    flex-shrink: 0;
    font-size: 16px;
  }

  &:disabled {
    cursor: default;
    padding-right: 14px;
  }
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

export const Unit = styled.div`
  position: relative;

  .unit {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 14px;
    padding-block: 0.625rem;
    padding-inline: 1rem;
  }
`;
