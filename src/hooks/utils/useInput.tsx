import { useState, useCallback } from 'react';

const useInput = <T extends Record<string, unknown>>(initialState: T) => {
  const [inputValues, setInputValues] = useState<T>(initialState);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target;

    // Number 유효성 검사
    if (typeof initialState[name] === 'number') {
      if (isNaN(Number(value))) {
        if (!isNaN(parseInt(value))) value = parseInt(value).toString();
        else value = '';
      }
    }

    setInputValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const inputReset = useCallback(
    (isBlank: boolean = false) => {
      if (!isBlank) setInputValues(initialState);
      else {
        const keys = Object.keys(inputValues);
        keys.forEach(key => {
          setInputValues(prev => ({ ...prev, [key]: '' }));
        });
      }
    },
    [initialState]
  );

  return [inputValues, onChange, inputReset] as const;
};

export default useInput;
