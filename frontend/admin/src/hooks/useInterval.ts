import { useEffect, useRef, useState } from 'react';

interface IntervalHook {
  (callback: any, delay: number): void;
}

const useInterval: IntervalHook = (callback, delay) => {
  const savedCallback = useRef<any>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
};

export default useInterval;
