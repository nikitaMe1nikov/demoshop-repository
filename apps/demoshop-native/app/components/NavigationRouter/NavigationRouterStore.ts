import { whenDestroy, EMPTY_FUNC, EMPTY_OBJECT, isString, delay } from '@nimel/directorr';
import {
  actionRouterPush,
  effectRouterPush,
  actionRouterBack,
  effectHistoryPush,
  actionHistoryPush,
  QueryObject,
  RouterActionPayload,
  ACTION,
  HistoryActionPayload,
  calcPath,
  effectRouterBack,
  actionRouterReload,
  effectRouterReload,
  effectRouterState,
  effectRouterIsPattern,
  actionRouterIsPatternSuccess,
  RouterIsPatternActionPayload,
  actionRouterReplace,
  effectRouterReplace,
  generatePath,
} from '@nimel/directorr-router';
import { LinkingOptions, NavigationContainerRef } from '@react-navigation/native';
import {
  getStateFromPath,
  getActionFromState,
  NavigationState,
  PartialState,
  PathConfig,
} from '@react-navigation/core';
import { notParsePath } from './messages';
import { actionRouterNavigate, effectRouterNavigate, RouterNavigatePayload } from './decorators';

const STATE_EVENT_NAME = 'state';
const SLASH_MARK = '/';
const EMPTY_STRING = '';

export function getPatternFromLinkingConfig(
  screenName: string,
  screens?: LinkingOptions['config']['screens']
): string | undefined {
  if (!screens) return undefined;

  for (const screen in screens) {
    const pathConfig = screens[screen];

    if (isString(pathConfig)) {
      if (screen === screenName) return pathConfig === EMPTY_STRING ? SLASH_MARK : pathConfig;
    } else {
      if (pathConfig.path !== undefined) {
        if (screen === screenName)
          return pathConfig.path === EMPTY_STRING ? SLASH_MARK : pathConfig.path;
      }

      if (pathConfig.screens) {
        const pattern = getPatternFromLinkingConfig(screenName, pathConfig.screens);

        if (pattern) return pattern;
      }
    }
  }

  return undefined;
}

type RouteState = NavigationState | Omit<PartialState<NavigationState>, 'stale'>;

type PatternState = {
  path: string;
  pattern: string;
  queryObject: QueryObject;
};

function getPatternFromState({ routes, index }: RouteState, options?: PathConfig): PatternState {
  const { screens } = options;
  const { name, params, state } = routes[index];
  const pathConfig = screens[name];

  if (pathConfig === undefined) {
    return { path: undefined, pattern: undefined, queryObject: undefined };
  } else if (isString(pathConfig)) {
    return {
      path: generatePath(pathConfig, params) || SLASH_MARK,
      pattern: pathConfig || SLASH_MARK,
      queryObject: (params || EMPTY_OBJECT) as QueryObject,
    };
  } else if (state) {
    return getPatternFromState(state, pathConfig);
  } else if ((params as any)?.screen) {
    const { screen, params: innerParams } = params as any;

    return getPatternFromState(
      { index: 0, routes: [{ name: screen, params: innerParams }] },
      pathConfig
    );
  }

  const { initialRouteName, screens: pathScreens } = pathConfig;
  const initialPathConfig = pathScreens[initialRouteName];

  if (!isString(initialPathConfig))
    throw new Error(
      `getPatternFromState: screen for initialRouteName=${initialRouteName} must be string`
    );

  return {
    path: generatePath(initialPathConfig, params) || SLASH_MARK,
    pattern: initialPathConfig || SLASH_MARK,
    queryObject: (params || EMPTY_OBJECT) as QueryObject,
  };
}

export class NavigationRouterStore {
  path: string;
  queryObject: QueryObject;
  pattern: string;
  linking: LinkingOptions;
  navigationRef: NavigationContainerRef;

  setNavigation = (navigationRef: NavigationContainerRef, linking: LinkingOptions) => {
    this.linking = linking;
    this.navigationRef = navigationRef;
    const state = this.navigationRef.getRootState();
    const { path, pattern, queryObject } = getPatternFromState(state, this?.linking.config);

    this.path = path;
    this.queryObject = queryObject;
    this.pattern = pattern;

    this.navigationRef.addListener(STATE_EVENT_NAME, this.toChange as any);
  };

  @effectRouterState
  toSetState = ({ path, queryObject }: RouterActionPayload) => {
    this.path = path;
    this.queryObject = queryObject;
  };

  @whenDestroy
  toDestroy = () => {
    this.navigationRef?.removeListener(STATE_EVENT_NAME, this.toChange as any);
  };

  @actionHistoryPush
  toChange = () => {
    const state = this.navigationRef.getRootState();
    const { path, pattern, queryObject } = getPatternFromState(state, this?.linking.config);

    if (this.pattern === pattern) return null;

    return {
      path,
      queryObject,
      action: ACTION.PUSH,
      pattern,
    };
  };

  @effectHistoryPush
  toHistoryPush = ({ path, queryObject, pattern }: HistoryActionPayload) => {
    this.path = path;
    this.queryObject = queryObject;
    this.pattern = pattern;
  };

  @actionRouterPush
  push = (path: string, queryObject?: QueryObject) => ({
    path,
    queryObject,
  });

  @effectRouterPush
  toPush = ({ path, queryObject }: RouterActionPayload) => {
    const state = getStateFromPath(calcPath(path, queryObject), this?.linking.config);

    if (state) {
      const action = getActionFromState(state);

      if (action) {
        this.navigationRef.dispatch(action);
      } else {
        this.navigationRef.reset(state);
      }
    } else {
      throw new Error(notParsePath(this.constructor.name, path));
    }
  };

  @actionRouterReplace
  replace = (path: string, queryObject?: QueryObject) => ({
    path,
    queryObject,
  });

  @effectRouterReplace
  toReplace = ({ path, queryObject }: RouterActionPayload) => {
    const state = getStateFromPath(calcPath(path, queryObject), this?.linking.config);

    if (state) {
      this.navigationRef.resetRoot(state);
    } else {
      throw new Error(notParsePath(this.constructor.name, path));
    }
  };

  @actionRouterBack
  back = EMPTY_FUNC;

  @effectRouterBack
  toBack = () => {
    if (this.navigationRef.canGoBack()) {
      this.navigationRef.goBack();
    }
  };

  @actionRouterReload
  reload = EMPTY_FUNC;

  @effectRouterReload
  toReload = () => this.navigationRef.resetRoot();

  @delay(0)
  @effectRouterIsPattern
  @actionRouterIsPatternSuccess
  checkPattern = ({ pattern }: RouterIsPatternActionPayload) => {
    // console.log('this.pattern === pattern', this.pattern, pattern, this.pattern === pattern);
    return this.pattern === pattern
      ? { pattern, path: this.path, queryObject: this.queryObject }
      : null;
  };

  @actionRouterNavigate
  navigateToName = (routeName: string) => ({
    routeName,
  });

  @effectRouterNavigate
  toNavigateToName = (payload: RouterNavigatePayload) => {
    this.navigationRef.navigate(payload.routeName);
  };

  toJSON = EMPTY_FUNC;
}

export default NavigationRouterStore;
