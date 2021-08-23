import { useState, Dispatch, SetStateAction, useEffect } from 'react';

/**
 * state 변경 이후, window scroll to top이 발생하는 hook
 */
const useScrollToTop = <T>(initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(initialValue);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [value]);
  return [value, setValue];
};
export default useScrollToTop;
