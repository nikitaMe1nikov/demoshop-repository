import smoothscroll from 'smoothscroll-polyfill';
import isPlainObject from 'lodash/isPlainObject';
import { isHavePassiveEvents } from 'utils/browser';

smoothscroll.polyfill();

// force use passive events
if (isHavePassiveEvents()) {
  const DEFAULT_OPTIONS = {
    passive: true,
    capture: false,
    once: false,
  };

  const SUPPORTED_PASSIVE_TYPES = [
    'scroll',
    'wheel',
    'pointerover',
    'pointerenter',
    'pointerdown',
    'pointermove',
    'pointerup',
    'pointercancel',
    'pointerout',
    'pointerleave',
    'gotpointercapture',
    'lostpointercapture',
    'touchstart',
    'touchmove',
    'touchenter',
    'touchend',
    'touchleave',
    'mouseout',
    'mouseleave',
    'mouseup',
    'mousedown',
    'mousemove',
    'mouseenter',
    'mouseover',
    'mousewheel',
    'focus',
    'blur',
    'popstate',
    'transitionend',
    'animationend',
    'resize',
    'webkitvisibilitychange',
    'online',
    'offline',
  ];

  const checkPassiveOptionForEvent = (passive, eventName) => {
    if (passive !== undefined) return passive;

    return SUPPORTED_PASSIVE_TYPES.indexOf(eventName) === -1 ? false : DEFAULT_OPTIONS.passive;
  };

  const eventPrototype = EventTarget.prototype;

  Object.defineProperty(eventPrototype, '_origAddEvent', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: eventPrototype.addEventListener,
  });

  eventPrototype.addEventListener = function addEventListener(type, listener, options) {
    const newOptions = isPlainObject(options)
      ? {
          ...DEFAULT_OPTIONS,
          ...(options as AddEventListenerOptions),
          passive: checkPassiveOptionForEvent((options as AddEventListenerOptions).passive, type),
        }
      : {
          ...DEFAULT_OPTIONS,
          capture: !!options,
          passive: checkPassiveOptionForEvent(undefined, type),
        };

    this._origAddEvent(type, listener, newOptions);
  };
}
