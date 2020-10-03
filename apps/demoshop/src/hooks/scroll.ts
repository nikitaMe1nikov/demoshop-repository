import { useEffect, useCallback, useRef } from 'react';
import { useThrottle } from './timers';

export type ScrollableElement = HTMLElement | Window | null | undefined;

const SCROLL_EVENT = 'scroll';
const DEFAULT_THRESHOLD = 800;
const DEBOUNCE_TIME = 16 * 8;

export function useScroll(
  scrollableElement: ScrollableElement,
  callback: () => void,
  debounce: number = DEBOUNCE_TIME
) {
  const scrollHandle = useThrottle(callback, debounce);

  useEffect(() => {
    if (scrollableElement) {
      scrollableElement.addEventListener(SCROLL_EVENT, scrollHandle);

      return () => {
        return scrollableElement.removeEventListener(SCROLL_EVENT, scrollHandle);
      };
    }
  }, [scrollHandle, scrollableElement]);
}

export function useScrollWindow(cb: () => void, debounce: number) {
  useScroll(window, cb, debounce);
}

function isReachedEnd(target: HTMLElement | Window, threshold: number) {
  const isWindowOrDocument =
    target === window || target === document.body || target === document.documentElement;

  const clientHeight = isWindowOrDocument
    ? window.screen.availHeight
    : (target as HTMLElement).clientHeight;
  const scrollTop = isWindowOrDocument ? window.pageYOffset : (target as HTMLElement).scrollTop;
  const scrollHeight = isWindowOrDocument
    ? document.documentElement.scrollHeight
    : (target as HTMLElement).scrollHeight;

  return scrollTop + clientHeight >= scrollHeight - threshold;
}

export function useScrollEnd(
  scrollableElement: ScrollableElement,
  callback: () => void,
  threshold: number = DEFAULT_THRESHOLD
) {
  const reachedState = useRef(false);
  const handleScroll = useCallback(() => {
    if (scrollableElement) {
      if (isReachedEnd(scrollableElement, threshold)) {
        if (!reachedState.current) {
          reachedState.current = true;
          callback();
        }
      } else {
        reachedState.current = false;
      }
    }
  }, [callback, scrollableElement, threshold]);

  useScroll(scrollableElement, handleScroll);
}

export function useWindowScrollEnd(callback: () => void, threshold?: number) {
  useScrollEnd(window, callback, threshold);
}

function calcPageNumber(target: HTMLElement | Window, pageHeight?: number) {
  const isWindowOrDocument =
    target === window || target === document.body || target === document.documentElement;

  const clientHeight =
    pageHeight ||
    (isWindowOrDocument ? window.screen.availHeight : (target as HTMLElement).clientHeight);
  const scrollTop = isWindowOrDocument ? window.pageYOffset : (target as HTMLElement).scrollTop;

  return Math.max(Math.ceil(scrollTop / clientHeight), 1);
}

export function useScrollPageCount(
  scrollableElement: ScrollableElement,
  callback: (page: number) => void,
  pageHeight: number = DEFAULT_THRESHOLD,
  initPage = 0
) {
  const currentPage = useRef(initPage);
  const handleScroll = useCallback(() => {
    if (scrollableElement) {
      const page = calcPageNumber(scrollableElement, pageHeight);

      if (page !== currentPage.current) {
        currentPage.current = page;
        callback(page);
      }
    }
  }, [callback, pageHeight, scrollableElement]);

  useScroll(scrollableElement, handleScroll);
}

export function useWindowScrollPageCount(
  callback: (page: number) => void,
  pageHeight?: number,
  initPage?: number
) {
  useScrollPageCount(window, callback, pageHeight, initPage);
}
