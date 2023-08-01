import styled from 'styled-components';

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

  &.required {
    &::after {
      content: '*';
      color: ${theme.colors.pri[500]};
      margin-left: 0.1rem;
    }
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

  & .opion-title {
    color: blue;
  }

  & > option[value=''][disabled] {
    display: none;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
    background-image: url(/imgs/selectArrow.png);
  }
`;

const InputField = styled.input`
  border: 1px solid #e5e7eb;
  color: #1f2937;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  width: 100%;
  padding: 0.625rem;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
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
};

export const TopTitleWrap = styled.div`
  text-align: center;

  h3 {
    font-weight: 800;
    font-size: ${theme.font.title};
    margin-bottom: 0.5rem;
  }

  p {
    font-size: ${theme.font.body};
  }
`;

export const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  width: 100%;
  margin-top: 3rem;
`;

export const FormContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  width: 100%;
  margin-top: 3rem;
  padding-inline: 2rem;
  gap: 0.5rem;
`;
