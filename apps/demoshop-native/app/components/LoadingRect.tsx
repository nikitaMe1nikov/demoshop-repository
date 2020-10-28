import React, { FC } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import platform from '@demoshop-native/theme/variables/platform';

const styles = StyleSheet.create({
  loading: {
    height: platform.getSize(6),
    borderRadius: 5,
    flex: 1,
    backgroundColor: platform.skeletonBackgroundColor,
  },
});

interface LoadingRectProps {
  style?: StyleProp<ViewStyle>;
  height?: number;
}

const LoadingRect: FC<LoadingRectProps> = ({ style, height }) => (
  <View style={[styles.loading, style, { height }]} />
);

export default LoadingRect;
