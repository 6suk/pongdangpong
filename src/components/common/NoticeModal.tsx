import { Button } from './Button';
import { Modal } from './Modal';

export interface NoticeModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  innerNotice: {
    title: string;
    content: string;
  };
  onClick?: () => void;
}

export const NoticeModal = ({ setIsOpen, innerNotice, onClick }: NoticeModalProps) => {
  return (
    <Modal setIsOpen={setIsOpen}>
      <h3>{innerNotice.title}</h3>
      <p>{innerNotice.content}</p>
      <div className="buttonWrapper">
        <Button
          isPri={false}
          onClick={() => {
            setIsOpen(false);
            if (onClick) onClick();
          }}
        >
          확인
        </Button>
      </div>
    </Modal>
  );
};
