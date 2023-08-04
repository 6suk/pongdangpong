
import { Dispatch, FC, SetStateAction, memo, useCallback } from 'react';

import { keyframes, styled } from 'styled-components';

import x from '@assets/icons/x.svg';
import theme from '@styles/theme';

interface ModalProps {
  children: React.ReactNode;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  maxWidth?: string;
  minHeight?: string;
  isScollbar?: boolean;
  closeOnClick?: boolean; // false일 시 배경 클릭 시에도 닫히지 않음
}

export interface ModalValueState {
  title: string;
  desc: string;
  button: { id: number; title: string; color: boolean }[];
}

const ModalComponent: FC<ModalProps> = ({
  children,
  setIsOpen,
  maxWidth,
  minHeight,
  isScollbar = true,
  closeOnClick = true,
}) => {
  const handleClose = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (closeOnClick === false) return;
      if (event.target === event.currentTarget) setIsOpen(false);
    },
    [setIsOpen, closeOnClick]
  );

  return (
    <>
      <S.ModalBackground onClick={handleClose}>
        <ModalContent
          $maxWidth={maxWidth}
          $minHeight={minHeight}
          className={isScollbar ? '' : 'no-scroll'}
          onClick={e => e.stopPropagation()}
        >
          <S.CloseButton onClick={() => setIsOpen(false)}>
            <img alt="close" src={x} />
          </S.CloseButton>
          <S.ModalInnerContent>{children}</S.ModalInnerContent>
        </ModalContent>
      </S.ModalBackground>
    </>
  );
};

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

const ModalContent = styled.div<{ $maxWidth?: string; $minHeight?: string }>`
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

const S = {
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

export const Modal = memo(ModalComponent);
