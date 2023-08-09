import { styled } from 'styled-components';

import theme from '@styles/theme';

interface DetailWrapProps {
  $marginTop?: string;
}

export const BasicContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  width: 100%;
`;

export const DetailWrap = styled.div<DetailWrapProps>`
  width: 100%;
  margin-top: ${({ $marginTop }) => $marginTop || '3rem'};
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 1024px;

  .memo {
    font-size: 16px;
    margin-inline: 1rem;
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid ${theme.colors.gray[800]};
    min-height: 100px;
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    margin-inline: 1rem;
    justify-content: space-between;

    &.sub {
      margin-inline: 0.5rem;
    }

    .title {
      display: flex;
      align-items: center;
    }

    h3 {
      font-size: ${theme.font.subTitle};
      font-weight: 800;

      &.number {
        color: ${theme.colors.pri[500]};
        margin-left: 0.5rem;
      }
    }

    .createdAt {
      font-size: ${theme.font.sm};
      color: ${theme.colors.gray[500]};
      font-weight: 300;
      margin-left: 1rem;
      letter-spacing: 0.5px;
    }
    .btns {
      display: flex;
      gap: 1rem;
      button {
        font-size: 14px;
        transition: all 0.4s;

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
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

export const ListWrap = styled.div`
  font-size: 16px;
  margin-inline: 1rem;

  .table {
    display: grid;
    width: 100%;
    gap: 1rem;
  }

  .table-row {
    display: grid;
    grid-template-columns: 1fr 1.5fr 1fr 1fr 2fr 0.6fr;
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
    margin-bottom: 1rem;
    margin-top: 2rem;

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
  margin-top: -1rem;
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-inline: 1rem;
  margin-bottom: 1rem;
`;
