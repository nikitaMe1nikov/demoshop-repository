import 'react-native-gesture-handler';
import React, { useRef, ComponentProps } from 'react';
import { useStore } from '@nimel/directorr-react';
import {
  NavigationContainer,
  NavigationContainerRef,
  LinkingOptions,
} from '@react-navigation/native';
import NavigationRouterStore from './NavigationRouterStore';
import { enableScreens } from 'react-native-screens';
enableScreens();

type NavigationRouterContainerProps = ComponentProps<typeof NavigationContainer> & {
  linking: LinkingOptions;
};

export function NavigationRouterContainer(props: NavigationRouterContainerProps) {
  const navigationRef = useRef<NavigationContainerRef>();
  const { setNavigation } = useStore(NavigationRouterStore);

  const onReady = () => {
    if (navigationRef.current) {
      setNavigation(navigationRef.current, props.linking);
      navigationRef.current = null;
    }
  };

  return <NavigationContainer {...props} ref={navigationRef} onReady={onReady} />;
}

export default NavigationRouterContainer;
