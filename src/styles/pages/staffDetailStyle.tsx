import { styled } from 'styled-components';

import theme from '@styles/theme';

export const StaffListWrap = styled.div`
  font-size: 16px;
  margin-inline: 1rem;

  .empty {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    color: ${theme.colors.gray[500]};

    svg {
      width: 60px;
    }
  }

  .table {
    display: grid;
    width: 100%;
    gap: 1rem;
  }

  .table-row {
    display: grid;
    grid-template-columns: 2fr 2fr 7fr 1fr;
    align-items: center;
    padding: 1rem;
    border: 1px solid ${theme.colors.gray[800]};
    text-align: left;
    cursor: pointer;
    border-radius: 6px;
    font-size: 14px;

    &.title {
      border: none;
      padding-block: 0;
      color: ${theme.colors.gray[500]};
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
    }

    p {
      transition: all 0.4s;
    }
  }
`;

export const StaffInfoBar = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${theme.colors.gray[800]};
  text-align: left;
  border-radius: 6px;
  font-size: 15px;
  justify-content: space-between;

  button {
    width: 80px;
  }

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

  &.title > p {
    font-weight: 600;
  }

  &.title {
    border: none;
    padding-block: 0;
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

  p {
    transition: all 0.4s;
  }

  .inactive {
    color: ${props => props.theme.colors.Error};
  }
`;

export const RolesModalWrap = styled.div`
  width: 100%;

  p.roles-title {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: ${theme.colors.gray[50]};
    text-align: left;
  }

  .roles-desc {
    text-align: left;
    font-size: 14px;
    color: ${theme.colors.gray[300]};
    margin-bottom: 1rem;
  }

  .chekBox-item {
    width: 100%;
    display: flex;
  }

  .checkBox-wrap {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2.5rem;
    margin-top: 1.5rem;
    margin-inline: 0.5rem;

    &.error {
      border: 1px solid rgba(223, 41, 29, 0.7);
      transition: all 0.3s;
      border-radius: 6px;
    }

    input[type='checkbox'] {
      display: none;
    }
    input[type='checkbox']:checked + label {
      background-color: ${theme.colors.pri[900]};
      border: 1.5px solid ${theme.colors.pri[500]};
    }

    label {
      width: 100%;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      border: 1px solid ${theme.colors.gray[600]};
      border-radius: 6px;
      transition: all 0.4s;
      max-height: 8rem;

      & :first-child {
        font-weight: 600;
        font-size: 16px;
      }
      & :last-child {
        font-size: 14px;
      }

      p {
        margin-bottom: 0;
      }
    }
  }
`;
