import { ChangeEvent, FC } from 'react';

import { styled } from 'styled-components';

import { SC } from '@styles/styles';

type InputFieldProps = {
  label?: string;
  name: string;
  value: string | number;
  error?: boolean;
  unit?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const InputField: FC<InputFieldProps> = ({ label, name, value, error = false, unit, ...rest }) => {
  return unit ? (
    <Unit>
      {label && <SC.Label htmlFor={name}>{label}</SC.Label>}
      <SC.InputField
        className={error ? 'error' : ''}
        id={name}
        name={name}
        value={value === 0 ? '' : value}
        {...rest}
      />
      <span className="unit">{unit}</span>
    </Unit>
  ) : (
    <div>
      {label && <SC.Label htmlFor={name}>{label}</SC.Label>}
      <SC.InputField
        className={error ? 'error' : ''}
        id={name}
        name={name}
        value={value === 0 ? '' : value}
        {...rest}
      />
    </div>
  );
};

export const Unit = styled.div`
  position: relative;

  .unit {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 14px;
    padding-block: 0.625rem;
    padding-inline: 1rem;
  }
`;
