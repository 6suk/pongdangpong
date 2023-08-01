import { useState, useCallback } from 'react';

const useCheckbox = (initialState: string[] = []) => {
  const [checkedValues, setCheckedValues] = useState<string[]>(initialState);

  const onCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setCheckedValues(prev => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter(item => item !== value);
      }
    });
  }, []);

  return [checkedValues, onCheckboxChange] as const;
};

export default useCheckbox;
