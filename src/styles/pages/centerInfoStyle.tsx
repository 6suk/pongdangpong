import { styled } from 'styled-components';

import theme from '@styles/theme';

export const CenterInfoWrap = styled.div`
  width: 100%;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 1024px;

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    margin-inline: 1rem;
    justify-content: space-between;

    .title {
      display: flex;
      align-items: center;
    }

    h3 {
      font-size: ${theme.font.subTitle};
      font-weight: 800;
    }
  }
`;

export const CenterInfoBar = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${theme.colors.gray[800]};
  text-align: left;
  border-radius: 6px;
  font-size: 16px;
  justify-content: space-between;

  .infos {
    display: flex;
    gap: 3rem;
    align-items: center;
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

  .edit-center {
    font-size: 12px;
    color: ${theme.colors.gray[400]};
  }
`;

export const CenterInfoBox = styled.div`
  padding: 1rem;
  border: 1px solid ${theme.colors.gray[800]};
  border-radius: 6px;
  font-size: 15px;
  margin-top: -1rem;

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
