import { Button } from './Button';
import { Modal } from './Modal';

export interface NoticeModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  innerNotice: {
    title: string;
    content: string;
  };
}

export const NoticeModal = ({ setIsOpen, innerNotice }: NoticeModalProps) => {
  return (
    <Modal setIsOpen={setIsOpen}>
      <h3>{innerNotice.title}</h3>
      <p>{innerNotice.content}</p>
      <div className="buttonWrapper">
        <Button isPri={false} onClick={() => setIsOpen(false)}>
          확인
        </Button>
      </div>
    </Modal>
  );
};
