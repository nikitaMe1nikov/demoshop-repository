import { useEffect } from 'react';

const RESIZE_EVENT = 'resize';

export function useWindowResize(handleResize: () => void) {
  useEffect(() => {
    window.addEventListener(RESIZE_EVENT, handleResize);

    return () => {
      window.removeEventListener(RESIZE_EVENT, handleResize);
    };
  }, [handleResize]);
}
