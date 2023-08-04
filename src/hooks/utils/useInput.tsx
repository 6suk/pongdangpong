import { useState, useCallback } from 'react';

const useInput = <T extends Record<string, unknown>>(initialState: T) => {
  const [inputValues, setInputValues] = useState<T>(initialState);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, type } = e.target;
    let value = e.target.value;

    if (name.toLocaleLowerCase().includes('phone')) {
      value = value.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    }

    switch (name) {
      case 'phone': {
        value = value.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
        break;
      }
      case 'birthDate': {
        value = value.replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3');
        break;
      }
    }

    // Number 유효성 검사
    if (typeof initialState[name] === 'number') {
      if (isNaN(Number(value))) {
        if (!isNaN(parseInt(value))) value = parseInt(value).toString();
        else value = '';
      }
    }
    setInputValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const inputReset = useCallback((data: T) => {
    if (data) setInputValues(data);
    else {
      const keys = Object.keys(inputValues);
      keys.forEach(key => {
        setInputValues(prev => ({ ...prev, [key]: '' }));
      });
    }
  }, []);

  return [inputValues, onChange, inputReset] as const;
};

export default useInput;
