import { ChangeEvent, FC } from 'react';

import { styled } from 'styled-components';

import { SC } from '@styles/styles';

type InputFieldProps = {
  className?: 'required';
  label?: string;
  name: string;
  value: string | number | undefined;
  error?: boolean;
  unit?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  min?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const InputField: FC<InputFieldProps> = ({ className, label, name, value, error = false, unit, ...rest }) => {
  return unit ? (
    <Unit>
      {label && (
        <SC.Label className={className || ''} htmlFor={name}>
          {label}
        </SC.Label>
      )}
      <SC.InputField
        className={error ? 'error' : ''}
        id={name}
        name={name}
        value={Number(value) === 0 || value === undefined ? '' : value}
        {...rest}
      />
      <span className="unit">{unit}</span>
    </Unit>
  ) : (
    <div>
      {label && (
        <SC.Label className={className || ''} htmlFor={name}>
          {label}
        </SC.Label>
      )}
      <SC.InputField
        className={error ? 'error' : ''}
        id={name}
        name={name}
        value={Number(value) === 0 ? '' : value}
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
