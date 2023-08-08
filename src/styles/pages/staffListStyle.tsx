import { styled } from 'styled-components';

import theme from '@styles/theme';

export const StaffsTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-block: 2rem;
  align-items: center;
  margin-inline: 1rem;

  h3 {
    font-weight: bold;
    size: ${theme.font.title};

    .highlight {
      color: ${theme.colors.pri[500]};
    }
  }

  .sort-and-btn {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }

  .ticket-active {
    display: flex;
    gap: 0.5rem;

    a {
      font-size: ${theme.font.sub};
      color: ${theme.colors.gray[500]};
    }

    .on {
      font-weight: 600;
      color: ${theme.colors.pri[500]};
    }
  }
`;
