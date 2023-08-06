import { useState } from 'react';

import { ValidationErrors } from '@components/center/ticket/TicketForm';

export interface ValidationProps {
  name: string;
  type: 'number' | 'string' | 'phone';
}

export const useValidation = () => {
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  /**
   * 에러 확인
   * @return boolean
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkForErrors = (checkInputs: ValidationProps[], inputValues: Record<string, any>) => {
    const errors: ValidationErrors = {};

    checkInputs.forEach(({ name, type }) => {
      switch (type) {
        case 'number':
          if (isEmpty(inputValues[name])) errors[name] = true;
          break;
        case 'string':
          if (isStringEmpty(inputValues[name])) errors[name] = true;
          break;
        case 'phone':
          if (isStringEmpty(inputValues[name]) || inputValues[name].length < 12) errors[name] = true;
          break;
        // ... 기타 타입 처리
      }
    });

    setValidationErrors(errors);
    setIsSubmit(Object.keys(errors).length !== 0);
    return Object.values(errors).every(error => error === false);
  };

  const isEmpty = (arg: string | number) => {
    if (arg !== 0 && arg !== undefined && arg !== '' && arg !== null) return false;
    return true;
  };

  const isStringEmpty = (arg: string) => {
    if (arg !== undefined && arg !== '' && arg !== null) return false;
    return true;
  };

  const updateValidationError = (name: string, state: boolean) => {
    setValidationErrors(prevState => ({
      ...prevState,
      [name]: state,
    }));
  };

  return { checkForErrors, validationErrors, updateValidationError, isSubmit };
};
