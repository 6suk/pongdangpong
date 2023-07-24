import { useState, useCallback } from 'react';

const useInput = <T extends object>(initialState: T) => {
  const [inputValues, setInputValues] = useState<T>(initialState);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
