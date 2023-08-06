import styled from 'styled-components';

import theme from '@styles/theme';

export const ErrorAndFindWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-content: center;
  margin-top: 1rem;
  margin-inline: 0.2rem;

  .errorMsg {
    margin: 0;
    font-size: ${theme.font.sub} !important;
    color: ${theme.colors.Error} !important;
  }
`;

export const LoginFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const InfoButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: ${theme.font.sub};
  color: ${theme.colors.DarkGray};
  align-items: center;

  box-sizing: border-box;

  &.center {
    justify-content: center;
    margin-top: 1rem;
  }

  .notice {
    color: ${theme.colors.DarkGray};
    font-size: ${theme.font.sub};
    margin: 0;
  }

  a {
    transition: all 0.4s;

    &:hover {
      font-weight: 600;
    }
  }

  .line {
    display: block;
    border-left: 1px solid ${theme.colors.gray[500]};
    height: 12px;
  }
`;

export const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 480px;
  width: 100%;
  background-color: #fff;
  gap: 2.5rem;
  margin-top: 4rem;

  p {
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    font-size: 16px;
    color: ${theme.colors.gray[50]};
  }
`;

export const LoginTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-items: flex-end;

  .login-active {
    display: flex;

    a,
    button {
      font-size: ${theme.font.subBody};
      color: ${theme.colors.gray[500]};
      padding: 12px;
      border-bottom: 2px solid ${theme.colors.gray[600]};
    }

    .on {
      font-weight: 600;
      color: ${theme.colors.pri[500]};
      border-bottom: 2px solid ${theme.colors.pri[300]};
    }
  }
`;

export const LoginInputWrap = styled.div`
  flex-direction: column;
  width: 100%;
  display: flex;
  gap: 1rem;
`;
