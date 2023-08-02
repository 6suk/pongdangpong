import styled from 'styled-components';

import theme from '@styles/theme';

export const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;

  p {
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    font-size: 16px;
    color: ${theme.colors.gray[50]};
  }
`;

export const LoginSelect = styled.div`
  text-align: left;
`;

export const LoginType = styled.button<{ isSelected: boolean }>`
  text-align: left;
  font-size: 18px;
  color: ${props => (props.isSelected ? theme.colors.pri[600] : theme.colors.gray[500])};
  border-bottom: 2px solid ${props => (props.isSelected ? theme.colors.pri[600] : theme.colors.gray[500])};
  cursor: pointer;
  margin: 0 10px;

  &:focus {
    outline: none;
  }
`;

export const LoginForm = styled.form`
  text-align: left;
  display: inline-block;
  margin-left: 10px;
  margin-bottom: 2rem;
`;

export const Links = styled.div`
  text-align: left;
  display: flex;
  margin-top: 2rem;
  margin-bottom: 4rem;
  color: ${theme.colors.gray[200]};

  a {
    font-size: 14px;
    text-decoration: none;
    margin-right: 5px;
    margin-left: 5px;
  }
`;
