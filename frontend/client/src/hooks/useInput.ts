import { useState, useCallback, Dispatch, SetStateAction } from 'react';

const useInput = <T>(
  initialValue: T
): [T, (e?: React.ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(initialValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};
export default useInput;
