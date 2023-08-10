import { useMemo, useEffect } from 'react';

import { useSwrData } from '@hooks/apis/useSwrData';

export function useEditMode<T>(isEditMode: boolean, pathname: string, initializeData: (data: T) => void) {
  const requestPath = useMemo(() => (isEditMode ? pathname.replace('/edit', '') : null), [isEditMode, pathname]);

  const { data, isLoading, isError } = useSwrData<T>(requestPath);

  useEffect(() => {
    if (data && !isLoading) {
      initializeData(data);
    }
  }, [data, isLoading]);

  return { data, isLoading, isError };
}
