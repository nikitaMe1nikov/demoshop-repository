import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import CategoriesScreen from 'screens/CategoriesScreen/CategoriesScreen';
import CategoryScreen from 'screens/CategoryScreen/CategoryScreen';

export type RootParamList = {
  categories: undefined;
  category: undefined;
};

const Stack = createNativeStackNavigator<RootParamList>();

export function CatalogNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
      }}
    >
      <Stack.Screen name="categories" component={CategoriesScreen} />
      <Stack.Screen name="category" component={CategoryScreen} />
    </Stack.Navigator>
  );
}

export default CatalogNavigator;
