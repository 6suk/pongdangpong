import styled from 'styled-components';

import Profile from '@/assets/icons/Profile.svg';

import theme from './theme';

const Container = styled.div`
  max-width: 2xl;
  margin: auto;
  background-color: white;
  padding: 4rem;
  text-align: left;
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;

  span::after {
    content: '*';
    color: ${theme.colors.pri[500]};
    margin-left: 0.1rem;
  }
`;

const Select = styled.select`
  border: 1px solid #e5e7eb;
  color: #1f2937;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  width: 100%;
  padding: 0.625rem;
  position: relative;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url(/imgs/selectArrow.png);
  background-repeat: no-repeat;
  background-position: calc(100% - 10px) center;
  background-size: 12px;
  padding: 0.625rem 40px 0.625rem 0.625rem;

  &#tutor,
  &#calendarUnit {
    width: auto;
  }

  /* & .opion-title {
    color: blue;
  } */

  & > option[value=''][disabled] {
    display: none;
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.pri[800]};
    box-shadow: 0 0 0 1px ${theme.colors.pri[900]};
    background-image: url(/imgs/selectArrow.png);
  }

  &:disabled {
    color: ${theme.colors.gray[500]};
    background-color: ${theme.colors.gray[800]};
  }

  option[value='0'][disabled] {
    display: none;
  }
  option[value=''][disabled] {
    display: none;
  }

  &.error {
    border: 1px solid rgba(${theme.colors.ErrorRGB}, 0.7);
    transition: all 0.3s;
  }
`;

const Select__ = styled.select`
  border: 1px solid #e5e7eb;
  color: #1f2937;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  width: 100%;
  padding: 0.625rem;
  position: relative;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url(/imgs/selectArrow.png);
  background-repeat: no-repeat;
  background-position: calc(100% - 10px) center;
  background-size: 12px;
  padding: 0.625rem 40px 0.625rem 0.625rem;

  & .opion-title {
    color: blue;
  }

  & > option[value=''][disabled] {
    display: none;
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.pri[800]};
    box-shadow: 0 0 0 1px ${theme.colors.pri[900]};
    background-image: url(/imgs/selectArrow.png);
  }
`;

const InputField = styled.input`
  border: 1px solid #e5e7eb;
  color: #1f2937;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  width: ${props => props.width || '100%'};
  padding: 0.625rem;

  &:focus {
    outline: none;
    border-color: ${theme.colors.pri[800]};
    box-shadow: 0 0 0 1px ${theme.colors.pri[900]};
  }

  &:disabled {
    color: ${theme.colors.gray[500]};
    background-color: ${theme.colors.gray[800]} !important;

    & + .unit {
      color: ${theme.colors.gray[500]};
    }
  }

  &::placeholder {
    color: ${theme.colors.gray[600]};
  }

  &.error {
    border: 1px solid rgba(${theme.colors.ErrorRGB}, 0.7);
    transition: all 0.3s;
  }
`;

type TextareaFieldProps = {
  width?: string;
};

const TextareaField = styled.textarea<TextareaFieldProps>`
  border: 1px solid #e5e7eb;
  color: #1f2937;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  width: ${props => props.width || '100%'};
  padding: 0.625rem;
  resize: none;

  &:focus {
    outline: none;
    border-color: ${theme.colors.pri[800]};
    box-shadow: 0 0 0 1px ${theme.colors.pri[900]};

    &[readonly] {
      border-color: #e5e7eb;
      box-shadow: none;
    }
  }

  &:disabled {
    color: ${theme.colors.gray[500]};
    background-color: ${theme.colors.gray[800]} !important;

    & + .unit {
      color: ${theme.colors.gray[500]};
    }
  }

  &::placeholder {
    color: ${theme.colors.gray[600]};
  }

  &.error {
    border: 1px solid rgba(${theme.colors.ErrorRGB}, 0.7);
    transition: all 0.3s;
  }
`;

export const SC = {
  Container,
  Form,
  Label,
  InputField,
  Select,
  Select__,
  TextareaField,
};

export const TopTitleWrap = styled.div`
  text-align: center;

  h3 {
    font-weight: 800;
    font-size: ${theme.font.title};
    color: ${theme.colors.pri[500]};
    margin-bottom: 0.5rem;
  }

  p {
    font-size: ${theme.font.body};
    color: ${theme.colors.gray[300]};
  }
`;

export const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  width: 100%;
  margin-top: 3rem;
`;

export const FormContentWrap = styled.div<{ $isSubHeader?: boolean }>`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  width: 100%;
  margin-top: ${props => (props.$isSubHeader === false ? '2rem' : '3rem')};
  padding-inline: 2rem;
  gap: 1rem;

  .time-inputs,
  .button-container {
    display: flex;
    gap: 1rem;
    align-items: center;
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
