import { styled } from 'styled-components';

import theme from '@styles/theme';

export const ModalInInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-block: 2rem;

  label {
    text-align: left;
  }

  p {
    text-align: left;
  }
`;

export const RoleFlexContainer = styled.div`
  display: flex;
  gap: 3rem;
  margin-top: 2rem;
`;

export const RoleGridContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(4, minmax(104px, 1fr));
  grid-auto-flow: row;
  row-gap: 0.5rem;
  column-gap: 3rem;
  width: 100%;

  .row-input {
    display: flex;
    gap: 0.5rem;

    :first-child {
      flex: 7;
    }
    :last-child {
      flex: 3;
    }
  }
`;

export const RolesWrap = styled.div`
  width: 100%;

  h3.roles-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  p.roles-title {
    display: block;
    /* margin-bottom: 0.5rem; */
    font-size: 0.875rem;
    font-weight: 600;
    color: #4b5563;
  }

  .roles-title::after {
    content: '*';
    color: #4679fc;
    margin-left: 0.1rem;
  }

  .roles-desc {
    font-size: 14px;
    color: ${theme.colors.gray[400]};
    margin-bottom: 1rem;
  }

  .checkBox-wrap {
    &.error {
      border: 1px solid rgba(223, 41, 29, 0.7);
      transition: all 0.3s;
      border-radius: 6px;
    }

    display: flex;
    flex-direction: column;
    gap: 1rem;

    input[type='checkbox'] {
      display: none;
    }
    input[type='checkbox']:checked + label {
      background-color: ${theme.colors.pri[900]};
      border: 1.5px solid ${theme.colors.pri[500]};
    }

    label {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      border: 1px solid ${theme.colors.gray[600]};
      border-radius: 6px;
      transition: all 0.4s;

      & :first-child {
        font-weight: 600;
        font-size: 16px;
      }
      & :last-child {
        font-size: 14px;
      }
    }
  }
`;

export const CompletionWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;

  h1 {
    font-size: ${theme.font.title};
    font-weight: 800;
    margin-bottom: 0.5rem;
  }

  svg {
    width: 450px;
    height: auto;
  }

  p {
    text-align: center;
    margin-bottom: 1rem;
  }

  .staff-info {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;

    dl {
      font-size: 14px;
      display: flex;
      flex-direction: row;
      gap: 1rem;
      padding-inline: 1rem;
      padding-block: 0.2rem;
      background-color: ${theme.colors.pri[900]};
      border-radius: 6px;

      dt {
        font-weight: 600;
        color: ${theme.colors.pri[500]};
      }
    }
  }
`;
