import styled from 'styled-components';

import theme from '@styles/theme';

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

  // number화살표 없애기
  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
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
  Label,
  InputField,
  Select,
  TextareaField,
};
