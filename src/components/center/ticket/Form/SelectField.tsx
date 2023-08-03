import { ChangeEvent, FC } from 'react';

import { SC } from '@styles/styles';

type SelectProps = {
  className?: 'required';
  name: string;
  value: string | number;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  options: { value: string | number; label: string }[];
  label?: string;
  placeholder?: string;
  error?: boolean;
};

export const SelectField: FC<SelectProps> = ({
  className,
  label,
  name,
  value,
  onChange,
  disabled = false,
  options,
  placeholder,
  error,
}) => {
  return (
    <>
      {label && (
        <SC.Label className={className || ''} htmlFor={name}>
          {label}
        </SC.Label>
      )}
      <SC.Select
        className={error ? 'error' : ''}
        disabled={disabled}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      >
        {placeholder && (
          <option disabled value="">
            {placeholder}
          </option>
        )}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SC.Select>
    </>
  );
};
