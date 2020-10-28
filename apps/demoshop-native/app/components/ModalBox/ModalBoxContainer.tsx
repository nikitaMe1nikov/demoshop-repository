import React, { FC, ComponentType } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@nimel/directorr-react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from 'react-native-screens/native-stack';
import { ModalBoxStore } from './ModalBoxStore';

const Stack = createNativeStackNavigator();
const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  stackPresentation: 'fullScreenModal',
};

export interface ModalBoxContainerProps {
  MainNavigator: ComponentType;
}

export const ModalBoxContainer: FC<ModalBoxContainerProps> = ({ MainNavigator }) => {
  const { modals } = useStore(ModalBoxStore);
  const modalsComponents = [...modals.entries()];

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="MainNavigator" component={MainNavigator} />
      {modalsComponents.map(([name, Component]) => (
        <Stack.Screen key={name} name={name} component={Component} />
      ))}
    </Stack.Navigator>
  );
};

export default observer(ModalBoxContainer);
