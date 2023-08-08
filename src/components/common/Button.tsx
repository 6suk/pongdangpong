import { CommonButton } from '@styles/common/buttonStyle';

interface ButtonProps {
  isPri?: boolean;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  size?: keyof typeof buttonsize;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const buttonsize = {
  main: `width: 146px; padding-inline: 2rem; padding-block: 0.8rem;`,
  full: `width: 100%; padding-inline: 2rem; padding-block: 0.8rem;`,
  md: `padding-inline: 2rem; padding-block: 0.6rem;`,
};

export const Button: React.FC<ButtonProps> = ({ isPri, children, type = 'button', size = 'main', ...rest }) => {
  return (
    <>
      <CommonButton $isPri={isPri} $size={buttonsize[size]} type={type} {...rest}>
        {children}
      </CommonButton>
    </>
  );
};
