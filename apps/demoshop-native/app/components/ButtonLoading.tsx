import React, { FC, memo } from 'react';
import { StyleSheet, StyleProp, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { Text, Badge, Icon, Button, NativeBase } from 'native-base';
import { childrenCenter } from '@demoshop-native/components/layoutStyles';
import platform from '@demoshop-native/theme/variables/platform';

// const useStyles = makeStyles({
//   label: (isLoading) =>
//     isLoading && {
//       visibility: 'hidden',
//     },
//   startIcon: (isLoading) =>
//     isLoading && {
//       position: 'absolute',
//       visibility: 'visible',
//       margin: 0,
//     },
// });

// const styles = StyleSheet.create({
//   badge: {
//     position: 'absolute',
//     bottom: 2,
//     left: '50%',
//   },
// });

type ButtonLoadingProps = NativeBase.Button & {
  isLoading?: boolean;
  label: string;
};

export const ButtonLoading: FC<ButtonLoadingProps> = ({
  style,
  isLoading,
  label,
  onPress,
  ...rest
}) => (
  <Button style={[childrenCenter, style]} {...rest} onPress={isLoading ? undefined : onPress}>
    {isLoading ? (
      <ActivityIndicator size="large" color={platform.buttonSpinnerColor} />
    ) : (
      <Text>{label}</Text>
    )}
  </Button>
);

export default memo(ButtonLoading);
