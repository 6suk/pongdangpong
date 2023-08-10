import styled from 'styled-components';

import theme from '@styles/theme';

export const SearchListWrap = styled.div`
  font-size: 16px;
  margin-inline: 1rem;

  .table {
    display: grid;
    width: 100%;
    gap: 1rem;
  }

  .table-row {
    display: grid;
    grid-template-columns: 3fr 2fr 2fr;
    align-items: center;
    padding: 1rem;
    border: 1px solid ${theme.colors.gray[800]};
    text-align: left;
    cursor: pointer;
    border-radius: 6px;
    font-size: 14px;

    &.title > p {
      font-weight: 600;
    }

    &.title {
      /* border-top: 1px solid ${theme.colors.gray[800]}; */
      border: none;
      padding-block: 0;
    }

    .icon-box {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-weight: 600;

      svg {
        width: 26px;
        height: auto;
      }

      span {
        width: 80px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    p {
      transition: all 0.4s;
    }

    &:hover {
      p {
        opacity: 0.7;
      }

      &.title p {
        opacity: 1;
      }
    }
  }
`;

export const HomeSummaryWrap = styled.div`
  display: flex;
  width: 100%;
  max-width: 1024px;
  flex-direction: column;
  position: relative;
  align-items: center;
  margin-inline: 1rem;

  .ad-wrapper {
    display: flex;
    justify-content: space-between;

    width: 100%;
    margin-bottom: 2rem;
    margin-top: 3rem;

    .ad-btn {
      display: flex;
      width: 100%;
      flex-direction: column;
      position: relative;
      height: 90px;
      transition: all 0.4s;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      margin-inline: 1rem 0;
    }
  }

  .btn-wrapper {
    display: flex;
    width: 100%;
    gap: 0.8rem;
    margin-inline: 1rem;

    .btn-container {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;

      .top-left-text {
        position: relative;
        margin-bottom: 1rem;
        margin-inline: 1rem;
        left: 0.5rem;
        bottom: -0.5rem;
        color: ${theme.colors.gray[200]};
        font-size: ${theme.font.sub};
      }

      .home-btn {
        display: flex;
        flex-direction: column;
        padding: 1.25rem;

        border-radius: 6px;
        border: 1px solid ${theme.colors.inputBorder};
        position: relative;
        height: 220px;
        transition: all 0.4s;
        margin-inline: 1rem 0;

        h4 {
          font-weight: 600;
          font-size: ${theme.font.body};
          color: ${theme.colors.gray[50]};
          margin-bottom: 0.5rem;
        }

        h6 {
          font-size: ${theme.font.body};
          color: ${theme.colors.gray[50]};
        }

        .count {
          position: absolute;
          bottom: -1rem;
          right: 0;
          padding: 1.25rem;
          color: ${theme.colors.pri[500]};
          font-size: 2.25rem;
          font-weight: 800;
        }

        &:hover {
          border: 1px solid ${theme.colors.pri[700]};
        }
      }

      .icon-box {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0.5rem;
        border-radius: 50%;
        background-color: ${theme.colors.gray[800]};
        aspect-ratio: 1/1;
        display: flex;
        margin: 1.25rem;
        align-items: center;
        width: 40px;
        height: 40px;
        justify-content: center;
        svg {
          height: 22px;
          width: auto;

          fill: ${theme.colors.gray[700]};
        }
      }
    }
  }
`;

export const SearchContainer = styled.div`
  justify-content: flex-end;
  display: flex;
  width: 100%;
  margin-inline: 1rem;
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-inline: 1rem;
  margin-bottom: 1rem;
`;

export const Tag = styled.span`
  font-size: ${theme.font.sm};
  text-align: center;
  width: 50px !important;
  padding-inline: 0.5rem;
  padding-block: 0.2rem;
  background-color: ${theme.colors.pri[900]};
  color: ${theme.colors.pri[500]};
  border-radius: 6px;
`;
