import { useState, useCallback, Dispatch, SetStateAction } from 'react';

type CustomInputReturn<T> = [T, (e?: React.ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>];

const useInput = <T>(initialValue: T): CustomInputReturn<T> => {
  const [value, setValue] = useState<T>(initialValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};
export default useInput;
