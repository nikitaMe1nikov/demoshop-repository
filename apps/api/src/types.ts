import { IncomingMessage, ServerResponse } from 'http';
import type { OrderData } from '@api/db';
// import {JSONCookie} from 'cookie-parser';

export interface ServerRequest extends IncomingMessage {
  cookies: { [key: string]: string };
}

export interface UserJWTData {
  sub: string;
}

export interface AnonimOrderData extends OrderData {}

export interface GQLContext {
  req: ServerRequest;
  res: ServerResponse;
  connection: any;
  payload: any;
}

export interface Context extends GQLContext {
  anonimOrder?: AnonimOrderData;
  user?: UserJWTData;
}
