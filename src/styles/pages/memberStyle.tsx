import { styled } from 'styled-components';

import theme from '@styles/theme';

export const MemberInfoBar = styled.ul`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${theme.colors.gray[800]};
  text-align: left;
  border-radius: 6px;
  font-size: 15px;
  justify-content: space-between;

  & > li {
    display: flex;
    align-items: center;

    & > .pic {
      margin-right: 10px;
    }

    & > p {
      & > span {
        color: gray;
        margin-right: 10px;
      }
    }

    & > p:nth-of-type(1) {
      width: 140px;
    }
    & > p:nth-of-type(2) {
      width: 180px;
    }
    & > p:nth-of-type(3) {
      width: 170px;
    }
    & > p:nth-of-type(4) {
      width: 80px;
    }
    & > p:nth-of-type(5) {
      width: 200px;
    }
  }
`;

export const MemberTopTitle = styled.div`
  display: flex;
  flex-direction: row;
  padding-block: 1rem;
  align-items: center;
  margin-inline: 1rem;

  h3 {
    font-weight: bold;
    size: ${theme.font.title};

    .highlight {
      color: ${theme.colors.pri[500]};
    }
  }
`;

export const MemberWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  margin-inline: 1rem;
  justify-content: space-between;

  button {
    margin-left: auto;
  }

  .top-left {
    display: flex;
    gap: 1rem;
    select {
      width: auto;
    }

    input[type='text'] {
      width: 100%;
    }
  }

  .search-bar {
    position: relative;
    display: flex;
    align-items: center;

    .search-submit {
      position: absolute;
      right: 0;
      margin-right: 1rem;
      transition: all 0.4s;

      &:hover {
        opacity: 0.5;
      }

      svg {
        width: 17px;
        fill: ${theme.colors.gray[400]};
      }
    }
  }
`;
