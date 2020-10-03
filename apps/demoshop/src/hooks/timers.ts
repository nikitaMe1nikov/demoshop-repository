import { useEffect, useState, useRef, useCallback } from 'react';

export function useDebounceValue<T>(value: T, delay = 0) {
  const [debVal, setDebVal] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebVal(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debVal;
}

export function useDebounce(callback: () => void, delay = 0) {
  const handler = useRef<any>();
  const debounceCall = useCallback(() => {
    clearTimeout(handler.current);

    handler.current = setTimeout(callback, delay);
  }, [callback, delay]);

  useEffect(() => () => clearTimeout(handler.current), []);

  return debounceCall;
}

export function useThrottle(callback: () => void, delay = 0) {
  const handler = useRef<any>();
  const debounceCall = useCallback(() => {
    if (!handler.current) {
      handler.current = setTimeout(() => {
        handler.current = null;
        callback();
      }, delay);
    }
  }, [callback, delay]);

  useEffect(() => () => clearTimeout(handler.current), []);

  return debounceCall;
}
