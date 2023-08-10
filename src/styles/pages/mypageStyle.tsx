import styled from 'styled-components';

import theme from '@styles/theme';

export const MyInfoBar = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${theme.colors.gray[800]};
  text-align: left;
  border-radius: 6px;
  font-size: 16px;
  justify-content: space-between;
  margin-inline: 1rem;

  .infos {
    display: flex;
    gap: 3rem;
    align-items: center;
  }

  .name-and-role {
    display: flex;
    gap: 1rem;

    .role-box {
      display: flex;
      gap: 0.2rem;
      align-items: center;

      .tag {
        font-size: ${theme.font.sm};
        padding-inline: 0.5rem;
        padding-block: 0.2rem;
        background-color: ${theme.colors.pri[900]};
        color: ${theme.colors.pri[500]};
        border-radius: 6px;
      }
    }
  }

  .icon-box {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-weight: 600;

    svg {
      width: 30px;
    }
  }
  .center-name {
    font-size: 14px;
    color: ${theme.colors.gray[200]};
    margin-left: 1rem;
  }

  .center-code {
    font-size: 14px;
    color: ${theme.colors.gray[200]};
  }
  .data {
    font-size: 14px;
    color: ${theme.colors.pri[600]};
    font-weight: 600;
  }
`;

export const MyInfoBox = styled.div`
  padding: 1rem;
  border: 1px solid ${theme.colors.gray[800]};
  border-radius: 6px;
  font-size: 15px;
  margin-top: -1rem;
  margin-inline: 1rem;

  .table {
    width: 100%;
  }

  .table-row {
    display: flex;
    align-items: center;
    padding: 0.5rem;

    .title {
      width: 150px;
      text-align: left;
      color: ${theme.colors.gray[400]};
    }

    .data {
      text-align: left;
      color: ${theme.colors.gray[50]};
      font-weight: 600;
    }
  }
`;
