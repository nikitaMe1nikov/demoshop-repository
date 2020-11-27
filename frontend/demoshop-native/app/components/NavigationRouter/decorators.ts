import { createActionAndEffect } from '@nimel/directorr';
export {
  actionRouterPush,
  effectRouterPush,
  actionRouterReplace,
  effectRouterReplace,
  actionRouterBack,
  effectRouterBack,
  actionRouterReload,
  effectRouterReload,
  actionRouterState,
  effectRouterState,
  effectHistoryPush,
  actionHistoryPush,
  actionRouterIsPattern,
  effectRouterIsPattern,
  actionRouterIsPatternSuccess,
  effectRouterIsPatternSuccess,
  historyChange,
  RouterActionPayload,
  RouterIsPatternActionPayload,
  RouterIsPatternSuccessActionPayload,
  HistoryActionPayload,
} from '@nimel/directorr-router';

export interface RouterNavigatePayload {
  routeName: string;
}

export const [actionRouterNavigate, effectRouterNavigate] = createActionAndEffect<
  RouterNavigatePayload
>('ROUTER.COMPONENT_NAME_NAVIGATE');
