import { styled } from 'styled-components';

import theme from '../theme';

export const Searchbar = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  input {
    padding: 0.5rem;
    padding-inline: 1rem;
    background-color: ${theme.colors.gray[800]};
    border: none;
  }

  .search-submit {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
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
`;

export const ModalSearchTop = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;
