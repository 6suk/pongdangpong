import styled from 'styled-components';

import theme from '@styles/theme';

interface ButtonProps {
  onClick?: () => void;
  bgColor?: keyof typeof theme.colors;
  textColor?: keyof typeof theme.colors;
  font?: keyof typeof theme.font;
  children?: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

interface StyledButtonProps {
  bgColor?: keyof typeof theme.colors;
  textColor?: keyof typeof theme.colors;
  font?: keyof typeof theme.font;
}

export const Button: React.FC<ButtonProps> = ({ children, bgColor, textColor, font, ...rest }) => {
  return (
    <ButtonStyled $styledProps={{ bgColor, textColor, font }} {...rest}>
      {children}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button<{ $styledProps: StyledButtonProps }>`
  ${({ $styledProps: { bgColor, textColor, font }, theme }) => `
    background-color: ${bgColor ? theme.colors[bgColor][500] : theme.colors['pri'][500]};
    color: ${textColor ? theme.colors[textColor][50] : theme.colors['gray'][50]};
    font-size: ${font ? theme.font[font] : theme.font.body};
  `}
  padding: 6px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 40px;
  position: relative;
  transition: all 0.4s;

  &:disabled {
    background-color: ${theme.colors.gray[700]};
    cursor: not-allowed;
  }
  &:hover {
    background-color: ${theme.colors.gray[700]};
  }
`;

export default Button;
