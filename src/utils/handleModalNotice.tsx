export const handleModalNotice = (
  title: string,
  content: string,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setInnerNotice: React.Dispatch<React.SetStateAction<{ title: string; content: string }>>
) => {
  setInnerNotice({ title, content });
  setIsOpen(true);
};
