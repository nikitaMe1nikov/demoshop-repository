export function eventListenerOptionsSupported() {
  const supportELO = [false, false];

  try {
    const opts = Object.defineProperties(
      {},
      {
        passive: {
          get() {
            supportELO[0] = true;
          },
        },
        once: {
          get() {
            supportELO[1] = true;
          },
        },
      }
    );

    window.addEventListener('test', null as any, opts);
    window.removeEventListener('test', null as any, opts);
  } catch (e) {
    /* empty */
  }

  return supportELO;
}

export function isHavePassiveEvents() {
  return eventListenerOptionsSupported()[0];
}
