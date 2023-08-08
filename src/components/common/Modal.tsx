import { Dispatch, FC, SetStateAction, memo, useCallback } from 'react';

import { XIcon } from '@assets/icons/indexIcons';
import { ModalContent, ModalStyle } from '@styles/modal/modalStyle';

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
      <ModalStyle.ModalBackground onClick={handleClose}>
        <ModalContent
          $maxWidth={maxWidth}
          $minHeight={minHeight}
          className={isScollbar ? '' : 'no-scroll'}
          onClick={e => e.stopPropagation()}
        >
          <ModalStyle.CloseButton onClick={() => setIsOpen(false)}>
            <XIcon />
          </ModalStyle.CloseButton>
          <ModalStyle.ModalInnerContent>{children}</ModalStyle.ModalInnerContent>
        </ModalContent>
      </ModalStyle.ModalBackground>
    </>
  );
};

export const Modal = memo(ModalComponent);
