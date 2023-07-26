import styled from 'styled-components';
import theme from '@styles/theme';

interface ButtonProps {
  onClick?: () => void;
  primary?: boolean;
  bgColor?: keyof typeof theme.colors;
  textColor?: keyof typeof theme.colors;
  font?: keyof typeof theme.font;
  size?: 'small' | 'medium' | 'large';
  children?: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const sizes = {
  small: { width: '5.625rem', height: '2.5rem' },
  medium: { width: '10rem', height: '3.125rem' },
  large: { width: '18.75rem', height: '3.125rem' },
};

export const Button: React.FC<ButtonProps> = ({
  primary = false,
  children,
  onClick,
  bgColor,
  textColor,
  font,
  ...rest
}) => {
  return (
    <ButtonStyled primary={primary} onClick={onClick} bgColor={bgColor} textColor={textColor} font={font} {...rest}>
      {children}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button<ButtonProps>`
  ${({ primary, bgColor, textColor, font, theme }) => {
    return `
      background-color: ${bgColor ? theme.colors[bgColor] : primary ? theme.colors.pri[500] : theme.colors.gray[800]};
      color: ${textColor ? theme.colors[textColor] : primary ? theme.colors.White : theme.colors.gray[50]};
      font-size: ${font ? theme.font[font] : theme.font.body};
      padding: 6px 20px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      margin-right: 40px;
      position: relative;
      transition: all .4s;
      
      &:disabled {
        background-color: ${theme.colors.gray[700]};
        cursor: not-allowed;
      }
      &:hover {
        background-color: ${primary ? theme.colors.pri[400] : theme.colors.gray[700]};
      }
    `;
  }}
`;

export default Button;
