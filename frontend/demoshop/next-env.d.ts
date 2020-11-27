/// <reference types="next" />
/// <reference types="next/types/global" />
declare namespace NodeJS {
  interface Global {
    window?: any;
    WebSocket: any;
  }
}
