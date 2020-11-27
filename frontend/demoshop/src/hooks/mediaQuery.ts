import { useEffect } from 'react';

const MEDIA_CHANGE_EVENT = 'change';

export function useMediaQuery(mediaQuery: string, handleMatch: (isMatch: boolean) => void) {
  useEffect(() => {
    const match = window.matchMedia(mediaQuery);
    const handler = (e: MediaQueryListEvent) => handleMatch(e.matches);

    // Safari hack
    if (match.addEventListener) {
      match.addEventListener(MEDIA_CHANGE_EVENT, handler);
    } else {
      match.addListener(handler);
    }

    handleMatch(match.matches);

    return () => {
      // Safari hack
      if (match.removeEventListener) {
        match.removeEventListener(MEDIA_CHANGE_EVENT, handler);
      } else {
        match.removeListener(handler);
      }
    };
  }, [mediaQuery, handleMatch]);
}
