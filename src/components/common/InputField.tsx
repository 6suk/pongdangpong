import { ChangeEvent, FC } from 'react';

import { Unit } from '@styles/common/FormStyle';
import { SC } from '@styles/common/inputsStyles';

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
  maxLength?: number;
  isStartZero?: boolean;
  pattern?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
};

export const InputField: FC<InputFieldProps> = ({
  className,
  label,
  name,
  value,
  type,
  error = false,
  unit,
  isStartZero = true,
  pattern,
  ...rest
}) => {
  if (isStartZero && (Number(value) === 0 || value === undefined)) {
    value = '';
  }

  if (pattern && value) {
    const re = new RegExp(pattern);
    value = value.toString().replace(re, '');
  }

  return unit ? (
    <Unit>
      {label && (
        <SC.Label className={className || ''} htmlFor={name}>
          {label}
        </SC.Label>
      )}
      <SC.InputField className={error ? 'error' : ''} id={name} name={name} value={value} {...rest} type={type} />
      <span className="unit">{unit}</span>
    </Unit>
  ) : (
    <div>
      {label && (
        <SC.Label className={className || ''} htmlFor={name}>
          {label}
        </SC.Label>
      )}
      <SC.InputField className={error ? 'error' : ''} id={name} name={name} value={value} {...rest} type={type} />
    </div>
  );
};
