import { styled } from 'styled-components';

interface ButtonProps {
  isPri?: boolean;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  size?: keyof typeof buttonsize;
  onClick?: () => void;
  disabled?: boolean;
}

const buttonsize = {
  main: `width: 146px;`,
  full: `width: 100%;`,
};

export const Button: React.FC<ButtonProps> = ({ isPri, children, type = 'button', size = 'main', ...rest }) => {
  return (
    <>
      <ButtonStyle $isPri={isPri} $size={buttonsize[size]} type={type} {...rest}>
        {children}
      </ButtonStyle>
    </>
  );
};

type ButtonStyleProps = {
  $isPri?: boolean;
  $size: string;
};

const ButtonStyle = styled.button<ButtonStyleProps>`
  ${({ $size, $isPri = true, theme }) => {
    const { colors, font } = theme;
    return `
      ${$size}
      padding-inline: 2rem;
      padding-block: 0.8rem;
      background-color: ${$isPri ? colors.pri[500] : colors.gray[800]};
      &:hover {
        background-color: ${$isPri ? colors.pri[400] : colors.gray[700]};
      }
      color: ${$isPri ? colors.White : colors.gray[50]};
      border-radius: 0.375rem;
      transition: background-color 0.2s ease-in-out;
      outline: none;
      &:focus {
        ring: 2px;
        ring-offset: 2px;
        ring-color: ${$isPri ? colors.pri[800] : colors.gray[800]};
      }
      font-size: ${font.sub};

      &:disabled {
        background-color: ${colors.gray[800]};
        cursor: not-allowed;
        color : ${colors.gray[500]}
      }
    `;
  }}
`;
