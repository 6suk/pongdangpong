import { ChangeEvent, FC } from 'react';

import { styled } from 'styled-components';

import { SC } from '@styles/styles';
import theme from '@styles/theme';

type SelectProps = {
  className?: 'required';
  name: string;
  value: string | number;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  options: { value: string | number; label: string }[];
  label?: string;
};

export const SelectField: FC<SelectProps> = ({
  className,
  label,
  name,
  value,
  onChange,
  disabled = false,
  options,
}) => {
  return (
    <>
      {label && (
        <SC.Label className={className || ''} htmlFor={name}>
          {label}
        </SC.Label>
      )}
      <StyledSelect disabled={disabled} id={name} name={name} value={value} onChange={onChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </>
  );
};

const StyledSelect = styled.select`
  border: 1px solid #e5e7eb;
  color: #1f2937;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  width: 100%;
  padding: 0.625rem;
  height: 43px;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }

  &:disabled {
    color: ${theme.colors.gray[500]};
    background-color: ${theme.colors.gray[800]};
  }
`;
