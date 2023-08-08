import { keyframes, styled } from 'styled-components';

import theme from '@styles/theme';

export const MemberModalWrap = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ModalList = styled.li`
  font-size: 14px;
  padding-block: 1rem;
  transition: all 0.4s;

  &:hover {
    opacity: 0.5;
  }

  .table-title {
    color: ${theme.colors.gray[600]};
  }

  button {
    text-align: left;
    width: 100%;
    display: grid;
    grid-template-columns: 3fr 2fr;
  }

  .left {
    display: grid;
    grid-template-columns: 0.2fr 0.5fr 2fr;
    gap: 0.5rem;
    text-align: left;

    p {
      font-size: 14px !important;
      margin-bottom: 0 !important;
    }
  }

  p {
    font-size: 14px !important;
    margin-bottom: 0 !important;
  }

  svg {
    width: 30px;
  }

  .tag {
    height: min-content;
    width: 53px;
    text-align: center;
    border-radius: 6px;
    font-size: 12px;
    padding-inline: 0.5rem;
    padding-block: 0.2rem;
    background-color: ${theme.colors.pri[900]};
    color: ${theme.colors.pri[500]};
  }
  .info {
    font-weight: 600;
    span {
      font-weight: 300;
      color: ${theme.colors.gray[500]};
    }
  }
`;

export const ModalListTop = styled.div`
  text-align: left;
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 2fr;
  font-size: 14px;
  padding-block: 1rem;
  transition: all 0.4s;
  font-weight: 600;

  .left {
    display: grid;
    grid-template-columns: 0.2fr 0.5fr 2fr;
    gap: 0.5rem;
    text-align: left;

    p {
      font-size: 14px !important;
      margin-bottom: 0 !important;
    }
  }

  p {
    font-size: 14px !important;
    margin-bottom: 0 !important;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const ModalContent = styled.div<{ $maxWidth?: string; $minHeight?: string }>`
  position: relative;
  background: white;
  border: 1px solid ${theme.colors.gray[600]};
  max-height: 100%;
  width: 100%;
  max-width: ${props => (!props.$maxWidth ? `28rem` : props.$maxWidth)};
  min-height: ${props => (!props.$minHeight ? `0` : props.$minHeight)};
  max-height: 800px;
  overflow-y: auto;
  border-radius: 0.5rem;
  padding: 3rem 2.5rem 2.5rem 2.5rem;
  text-align: center;

  .title-left {
    padding-top: 1rem;
    display: flex;
    text-align: left;
    flex-direction: row;
    padding-bottom: 1rem;
    align-items: flex-end;
    gap: 0.5rem;
    /* border-bottom: 1px solid ${theme.colors.gray[800]}; */
    h3 {
      margin-bottom: 0;
    }

    h2 {
      font-size: ${theme.font.subTitle};
      font-weight: 800;
      color: ${theme.colors.gray[100]};
    }

    p {
      margin-bottom: 0;
      font-size: ${theme.font.sub};
      color: ${theme.colors.gray[500]};
    }
  }

  &.no-scroll {
    overflow: hidden;
  }
`;

export const ModalStyle = {
  ModalBackground: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: ${`rgba(${theme.colors.Dim}, 0.5)`};
    animation: ${fadeIn} 0.5s;
    transition: opacity 0.5s;
    z-index: 999;
  `,

  ModalInnerContent: styled.div`
    h3 {
      margin-bottom: 1rem;
      font-size: ${theme.font.subTitle};
      font-weight: 800;
      color: ${theme.colors.gray[50]};
    }

    p {
      color: ${theme.colors.gray[50]};
      white-space: pre-wrap;
      margin-bottom: 1.5rem;
      font-size: ${theme.font.body};
    }
    .buttonWrapper {
      display: flex;
      justify-content: center;
      gap: 0.5rem;

      .modal-btn {
        max-width: 10rem;
        width: 100%;
        padding: 0.75rem;
        font-size: 14px;
        color: ${theme.colors.gray[50]};
        background-color: ${theme.colors.gray[800]};
        border-radius: 0.375rem;
        transition: background-color 0.2s ease-in-out;
        outline: none;

        &:focus {
          ring: 2px;
          ring-offset: 2px;
          ring-color: ${theme.colors.gray[800]};
        }
        &:hover {
          background-color: ${theme.colors.gray[700]};
        }

        .pri {
          &:focus {
            ring-color: ${theme.colors.pri[800]};
          }
          &:hover {
            background-color: ${theme.colors.gray[700]};
          }
        }
      }
    }
  `,

  CloseButton: styled.button`
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
  `,

  Description: styled.p`
    color: ${theme.colors.gray[50]};
    white-space: pre-wrap;
    margin-bottom: 1.5rem;
    font-size: ${theme.font.body};
  `,

  ButtonWrapper: styled.div`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  `,
};

export const ModalButton = styled.button<{ $isPrimary?: boolean }>`
  ${({ theme, $isPrimary = false }) => {
    const { colors, font } = theme;
    return `
      max-width: 10rem;
      padding: 0.75rem;
      background-color: ${$isPrimary ? colors.pri[500] : colors.gray[800]};
      &:hover {
        background-color: ${$isPrimary ? colors.pri[400] : colors.gray[700]};
      }
      color: ${$isPrimary ? colors.White : colors.gray[50]};
      border-radius: 0.375rem;
      width: 100%;
      transition: background-color 0.2s ease-in-out;
      outline: none;
      &:focus {
        ring: 2px;
        ring-offset: 2px;
        ring-color: ${$isPrimary ? colors.pri[800] : colors.gray[800]};
      }
      font-size: ${font.sub};
    `;
  }}
`;

export const ModalInfoTop = styled.div`
  margin-top: 1.5rem;
  margin-inline: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .modal-tag {
    font-size: ${theme.font.sub};
    color: ${theme.colors.pri[500]};
    background-color: ${theme.colors.pri[900]};
    padding-inline: 0.6rem;
    padding-block: 0.3rem;
    border-radius: 6px;
    width: fit-content;
    margin-bottom: 0;
  }

  .modal-info-title {
    text-align: left;
    font-size: ${theme.font.subTitle};
    margin-bottom: 0;
  }
`;

export const ModalInfoStyle = styled.div`
  display: grid;
  gap: 10px;
  margin-bottom: 2rem;
  margin-top: 2rem;
  text-align: left;

  dt {
    color: ${theme.colors.gray[500]};
  }

  dl {
    display: grid;
    grid-template-columns: 3fr 7fr;
    padding: 1rem;
    border-bottom: 1px solid ${theme.colors.gray[800]};
    column-gap: 2.5rem;
    font-size: 15px;
  }
  dl:first-child {
    border-top: 1px solid ${theme.colors.gray[800]};
  }

  dd {
    display: flex;
    gap: 0.5rem;

    svg {
      width: 24px;
      height: auto;
    }
  }
`;

export const SchedulesModalWrap = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    display: flex;
    text-align: left;
    flex-direction: column;

    h3 {
      margin-bottom: 0;
    }
  }

  .btns {
    display: flex;
    gap: 1rem;

    .schedules-btn {
      display: flex;
      flex-direction: column;
      padding: 1.25rem;
      border-radius: 6px;
      border: 1px solid ${theme.colors.inputBorder};
      width: 100%;
      position: relative;
      height: 180px;
      transition: all 0.4s;

      h4 {
        font-weight: 800;
        font-size: ${theme.font.body};
      }

      h6 {
        font-size: ${theme.font.sub};
        color: ${theme.colors.gray[400]};
      }

      &:hover:not(.none) {
        border: 1px solid ${theme.colors.pri[700]};
      }
    }

    .none {
      .icon-box {
        border: 1px solid ${theme.colors.gray[700]};
        background-color: transparent;

        svg {
          fill: ${theme.colors.gray[600]};
        }
      }
    }

    .icon-box {
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 0.5rem;
      border-radius: 50%;
      background-color: ${theme.colors.pri[900]};
      aspect-ratio: 1/1;
      display: flex;
      margin: 1.25rem;
      align-items: center;

      svg {
        height: 22px;
        width: auto;
        fill: ${theme.colors.pri[800]};
      }
    }
  }
`;
